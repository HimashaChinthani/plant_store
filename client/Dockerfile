#Use the base image from Dockure hub
FROM node:20-alpine

#Set the working directory
WORKDIR /app

#copy the package.json and package-lock.json files
# copy the package.json and package-lock.json files
COPY package*.json ./

#Install the dependancies
RUN npm install

#Copy the rest of application filr
COPY . .

#Expose the port
EXPOSE 3000

#Run the Application
CMD [ "npm","start" ]





