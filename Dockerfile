FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN ["chmod", "+x", "/usr/src/app/start.sh"]

CMD ./start.sh

