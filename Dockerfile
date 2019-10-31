FROM node:12.12-slim
WORKDIR /src/routers/index
COPY package.json /src/routers/index
RUN npm install
COPY . /src/routers/index
CMD ["npm", "start"]