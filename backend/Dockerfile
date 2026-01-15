# Start from a lightweight Node.js image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first (better caching)
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]