# Start your image with a node base image
FROM node:22-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

RUN npm install

# Copy the rest of the files
COPY . .

EXPOSE 8090

CMD [ "npm", "start" ]