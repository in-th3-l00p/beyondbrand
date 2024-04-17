FROM node:21

WORKDIR /shared/rabbitmq-client
COPY ../shared/rabbitmq-client/package*.json /shared/rabbitmq-client
RUN npm install
COPY ../shared/rabbitmq-client /shared/rabbitmq-client

WORKDIR /app
COPY package*.json /app
RUN npm install

COPY . /app

EXPOSE 3001
CMD ["npm", "run", "dev"]
