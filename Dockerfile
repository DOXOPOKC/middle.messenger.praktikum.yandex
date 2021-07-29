FROM node:14
WORKDIR /var/www
COPY . .
EXPOSE 3000
CMD npm ci && npm run start
