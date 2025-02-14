# Use the official Node.js image as base
FROM node:23.7

# Set working directory inside container
WORKDIR /app

# Set environment variable to allow legacy OpenSSL algorithms
ENV NODE_OPTIONS=--openssl-legacy-provider

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the React app files into the container
COPY . /app/

# Expose the frontend app port (default: 3000)
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
