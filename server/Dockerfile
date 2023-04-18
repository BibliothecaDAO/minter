# Use an official Python runtime as a parent image
FROM python:3.9

# Update the package index and install libmysqlclient-dev
RUN apt-get update && apt-get install -y libmariadb-dev-compat libmariadb-dev

# Set the working directory to /app
WORKDIR /app

ARG REPLICATE_API_TOKEN
ARG AWS_ACCESS
ARG AWS_SECRET_ACCESS_KEY
ARG DATABASE_URL
ARG PINATA_BEARER

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt


# Define environment variable
ENV NAME World

# Run the command to start the application
CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]