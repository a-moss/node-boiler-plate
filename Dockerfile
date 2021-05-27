FROM node:14

WORKDIR /work

COPY package*.json /

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "nodemon" ]
