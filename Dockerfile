FROM node:12-alpine

WORKDIR /usr/app

COPY package*.json .nvmrc ./

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start"]
