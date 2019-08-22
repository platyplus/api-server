FROM node:10.16.3-alpine as base
#USER node
WORKDIR /root/app
COPY package.json .

FROM base AS dependencies
RUN npm set progress=false && npm set unsafe-perm true && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install

FROM dependencies AS test
COPY . .
#RUN  npm run lint && npm run setup && npm run test
RUN npm test

FROM base AS build
RUN npm set progress=false && npm set unsafe-perm true && npm config set depth 0
RUN npm install
COPY . .
RUN npm run build

FROM base AS release
COPY --from=dependencies /root/app/prod_node_modules ./node_modules
COPY --from=build /root/app/dist ./dist
COPY . .
EXPOSE 5000
CMD npm start
