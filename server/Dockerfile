# Use an official Python runtime as a parent image
FROM python:3.9

# Update the package index and install libmysqlclient-dev
RUN apt-get update && apt-get install -y libmariadb-dev-compat libmariadb-dev

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run the command to start the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]