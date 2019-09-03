FROM node:latest

WORKDIR /app

COPY . .

ENV NODE_ENV=container

ENV PORT=5000

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]