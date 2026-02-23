# Use official Node.js Alpine image for a smaller footprint
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies without dev dependencies
RUN npm install --omit=dev

# Copy the rest of the backend application code
COPY . .

# Expose the port the app runs on
EXPOSE 8081

# Command to run the application
CMD ["npm", "run", "start"]