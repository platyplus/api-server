# TODO https://codefresh.io/docker-tutorial/node_docker_multistage/
FROM node:10.7.0-alpine
ENV PRISMA_ENDPOINT $PRISMA_ENDPOINT
ENV PRISMA_SECRET $PRISMA_SECRET
ENV APP_SECRET $APP_SECRET
ENV PRISMA_MANAGEMENT_API_SECRET $PRISMA_MANAGEMENT_API_SECRET
ENV NODE_ENV $NODE_ENV
WORKDIR /app
# Copying application code
COPY . /app
RUN npm set unsafe-perm true
# Creating tar of productions dependencies
#RUN npm install --production && cp -rp ./node_modules /tmp/node_modules
# Installing all dependencies
RUN npm install
# Running tests
RUN npm test

EXPOSE 5000
#COPY --from=builder /tmp/node_modules /server/node_modules
# Copying application code
#COPY --from=builder  /app/dist /server/dist
CMD node dist/index.js
