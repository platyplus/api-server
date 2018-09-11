# TODO https://codefresh.io/docker-tutorial/node_docker_multistage/
FROM node:10.7.0-alpine AS builder
WORKDIR /app
# Copying application code
COPY . /app
RUN npm set unsafe-perm true
# Creating tar of productions dependencies
RUN npm install --production && cp -rp ./node_modules /tmp/node_modules
# Installing all dependencies
RUN npm install
# Running tests
RUN npm test

FROM node:10.7.0-alpine AS runner
EXPOSE 5000
WORKDIR /server
# Adding production dependencies to image
COPY --from=builder /tmp/node_modules /server/node_modules
# Copying application code
COPY --from=builder  /app/dist /server/dist
CMD node dist/index.js
