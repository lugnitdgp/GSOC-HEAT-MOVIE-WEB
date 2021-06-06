FROM node:13.12.0-alpine

# Setting working directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copying source files
COPY . ./

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]