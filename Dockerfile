# Pulling Node Image
FROM node:14.15.1-buster-slim
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./ 
RUN npm install
# Copy server files to container
COPY . .
# Creating Port. Use npm start
EXPOSE 3000
CMD ["node", "app.js"]
