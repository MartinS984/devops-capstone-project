FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# Expose port 8080 for the frontend
EXPOSE 8080

CMD ["npm", "start"]