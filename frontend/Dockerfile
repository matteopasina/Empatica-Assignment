# base image
FROM node:13.3.0
RUN npm install -g yarn

WORKDIR /opt/ng
COPY package.json yarn.lock ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./ 
RUN ng build --prod