# TODO https://codefresh.io/docker-tutorial/node_docker_multistage/
FROM node:10.0-alpine AS builder
WORKDIR /app
COPY package.json /app
COPY tsconfig.json /app
# Creating tar of productions dependencies
RUN npm install --production && cp -rp ./node_modules /tmp/node_modules
# Installing all dependencies
RUN npm install
# Copying application code (for test only)
COPY . /app
# Running tests
RUN npm test

FROM node:10.0-alpine AS runner
EXPOSE 5000
WORKDIR /app
# Adding production dependencies to image
COPY --from=builder /tmp/node_modules /app/node_modules
# Copying application code
COPY --from=builder  /app/dist /app
CMD node index.js
