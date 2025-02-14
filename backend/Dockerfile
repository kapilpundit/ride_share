# Use an official Python runtime as a parent image
FROM python:3.10

# Set environment variables to avoid Python buffering logs
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (including MySQL client)
RUN apt-get update && apt-get install -y default-mysql-client

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the custom `settings.py` into the container
COPY ./ride_share/settings.py /app/ride_share/settings.py

# Copy the entire project into the container
COPY . /app/

# Copy the entrypoint script and give execution permissions
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Use the entrypoint script as the container's startup command
ENTRYPOINT ["/entrypoint.sh"]
