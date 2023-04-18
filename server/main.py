from dotenv import load_dotenv
import os
import uuid
import requests
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, Session
from pydantic import BaseModel
import replicate
from typing import Any, Dict
import boto3
from botocore.exceptions import NoCredentialsError
from tempfile import NamedTemporaryFile

load_dotenv()

REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN")
AWS_ACCESS = os.environ.get("AWS_ACCESS")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
DATABASE_URL = os.environ.get("DATABASE_URL")
PINATA_BEARER = os.environ.get("PINATA_BEARER")

bucket_url = 'https://adventurers.s3.amazonaws.com/'

# Set up FastAPI app
app = FastAPI()

# Set up S3 client
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Define Image and User models
class Image(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    uuid = Column(String(255), unique=True, default=str(uuid.uuid4()))
    s3_key = Column(String(255))
    image_label = Column(String(255))  # Added image_label field
    user_id = Column(Integer, ForeignKey('users.id'))
    ipfs_hash = Column(String(255))
    user = relationship('User', back_populates='images')

    __table_args__ = (
        UniqueConstraint('user_id', 'uuid', name='unique_user_image'),
    )

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True, index=True)
    images = relationship('Image', back_populates='user')

Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class GenerateImageInput(BaseModel):
    username: str
    image_label: str
    quantity: int

# Define Routes
@app.post('/generate_image/')
async def generate_image(input_data: GenerateImageInput, db: Session = Depends(get_db)) -> Dict[str, Any]:

    prompt = "8k, muted pastel colors, oil canvas painting, realistic, portrait, " + input_data.image_label + ". lighting background, bright lighting, high quality, perfect, beautiful, saturated"
    # Forward request to the image generation endpoint
    image_generation_response = replicate.run(
        "ai-forever/kandinsky-2:601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
        input={
            "prompt": prompt,
            "batch_size": input_data.quantity,
            "num_inference_steps": 75,
        }
    )

    # Loop over the generated image URLs
    images_data = []
    for image_url in image_generation_response:
        response = requests.get(image_url)

        if response.status_code != 200:
            raise HTTPException(status_code=400, detail='Image generation failed')

        # Store image in S3 bucket
        bucket_name = 'adventurers'
        unique_uuid = str(uuid.uuid4())
        s3_key = f'{input_data.username}/{unique_uuid}.png'

        try:
            s3.put_object(Bucket=bucket_name, Key=s3_key, Body=response.content)
        except NoCredentialsError:
            raise HTTPException(status_code=400, detail='S3 credentials not configured correctly')

        # Add user and image data to the PostgreSQL database
        user = db.query(User).filter(User.username == input_data.username).first()
        if not user:
            user = User(username=input_data.username)
            db.add(user)
            db.commit()
            db.refresh(user)

        image = Image(s3_key=s3_key, image_label=prompt, user_id=user.id, uuid=unique_uuid)
        db.add(image)
        db.commit()
        db.refresh(image)

        # Append the image data as a dictionary to the images_data list
        images_data.append({
            'id': image.id,
            'url': bucket_url + s3_key,
            'uuid': unique_uuid
        })

    return {'success': True, 'images': images_data}

@app.get('/user/{username}')
async def get_images(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')

    images = db.query(Image).filter(Image.user_id == user.id).all()
    return {'images': [{'url': bucket_url + image.s3_key, 'uuid': image.uuid, 'label': image.image_label} for image in images]}

@app.get('/images')
async def get_images(db: Session = Depends(get_db)):
    images = db.query(Image).all()
    return {'images': [{'url': bucket_url + image.s3_key, 'uuid': image.uuid, 'label': image.image_label, 'user_id': image.user_id} for image in images]}


class IPFS(BaseModel):
    url: str
    uuid: str


@app.post("/upload_image/")
async def upload_image(image: IPFS, db: Session = Depends(get_db)):
    
    # Download the image from the provided URL
    image_content = requests.get(image.url).content

    with NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
        temp_file.write(image_content)
        temp_file.flush()

        url = "https://api.pinata.cloud/pinning/pinFileToIPFS"

        payload = {
            'pinataOptions': '{"cidVersion": 1}',
            'pinataMetadata': '{"name": "Adventurer", "keyvalues": {"name": "Adventurer"}}'
        }
        files = {
            ('file', ("image", open(temp_file.name, 'rb'), 'application/octet-stream'))
        }
        headers = {
            'Authorization': 'Bearer ' + PINATA_BEARER
        }

        

        existing_image = db.query(Image).filter(Image.uuid == image.uuid).first()

        if existing_image:

            result = requests.post(url, headers=headers, data=payload, files=files)
            # Update the ipfs_hash attribute of the existing image
            existing_image.ipfs_hash = result.json()['IpfsHash']
            db.commit()
            os.remove(temp_file.name)
            return result.json()
        else:
            os.remove(temp_file.name)
            raise HTTPException(status_code=400, detail="Image with specified UUID does not exist")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)