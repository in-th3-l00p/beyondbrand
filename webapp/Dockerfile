FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
EXPOSE 3000

CMD ["npm", "start"]

