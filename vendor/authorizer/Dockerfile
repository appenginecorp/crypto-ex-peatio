FROM node:8-alpine

WORKDIR /src

COPY package.json yarn.lock ./
RUN yarn

COPY server.js ./

EXPOSE 8005
CMD ["npm", "start"]
