FROM node

MAINTAINER Reinhard Langner

RUN echo "building docker container"

WORKDIR /app
COPY . /app


RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]