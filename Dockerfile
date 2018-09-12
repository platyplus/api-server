# TODO https://codefresh.io/docker-tutorial/node_docker_multistage/
# TODO (DOCKER ENTRYPOINT?) prisma deploy, generate, seed...
# TODO hide prisma server to the external world :)
# TODO https://stackoverflow.com/questions/44140593/kubernetes-run-command-after-initialization
# TODO https://github.com/helm/helm/blob/master/docs/charts_hooks.md
# TODO revoir les noms des charts et releases
FROM node:10.7.0-alpine as base
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

FROM base AS release
COPY --from=dependencies /root/chat/prod_node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD npm run start
