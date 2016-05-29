FROM node

MAINTAINER ReLang

ENV NODE_ENV=production
ENV PORT=3000

RUN echo "building docker container"

WORKDIR /app
COPY . /app


RUN npm install

EXPOSE $PORT

CMD ["node", "app.js"]