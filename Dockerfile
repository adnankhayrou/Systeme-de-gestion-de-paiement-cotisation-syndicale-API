#  Dockerfile for Node Express Backend

FROM node:18.13-alpine

# Working directory be app
WORKDIR /app

# Install Dependencies
COPY package.json .

###  Installing dependencies
RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["npm","run","dev"]
