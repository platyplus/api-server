# TODO https://codefresh.io/docker-tutorial/node_docker_multistage/
# TODO (DOCKER ENTRYPOINT?) prisma deploy, generate, seed...
# TODO hide prisma server to the external world :)
# TODO https://stackoverflow.com/questions/44140593/kubernetes-run-command-after-initialization
# TODO https://github.com/helm/helm/blob/master/docs/charts_hooks.md
# TODO revoir les noms des charts et releases
FROM node:10.7.0-alpine
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
