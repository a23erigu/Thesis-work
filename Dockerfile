# Start your image with a node base image
FROM node:22-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Set environment port
ENV port=8090

# Expose port so that it allows connections
EXPOSE 8090

# Start container
CMD [ "npm", "start" ]