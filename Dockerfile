## Dockerfile created by Tiago Chagas
## Downloading the node image with alpine version (The most light and simplify version)
FROM node:alpine

## Defines the app local where Docker Container will be running.
WORKDIR /usr/app

## Copy all files with name ends like .json to /usr/app
COPY package*.json ./

## Execute npm install to add dependecies and create the node_modules directory.
RUN npm install

## Copy all files that are in Doockerfile same path to inside /usr/app container's directory
COPY . .

## Listening Container port  = 80
EXPOSE 80

## Run npm star to execute scripts in package.json
CMD npm start