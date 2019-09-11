# ---- Base Node ----
FROM node:10-stretch AS base
# set working directory
WORKDIR /usr/src/pacifica-metadata-mgmt
# Set running user PATH
ENV PATH /usr/src/pacifica-metadata-mgmt/node_modules/.bin:$PATH
# copy project file
COPY package.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --silent --only=production
COPY . .
# Create Production build
RUN npm run build
# copy production node_modules and build aside
RUN cp -R node_modules prod_node_modules
RUN cp -R build prod_build
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Test ----
# run linters, setup and tests (if appropriate)
FROM dependencies AS test
RUN  npm run eslint

#
# ---- Release ----
FROM nginx
COPY --from=dependencies /usr/src/pacifica-metadata-mgmt/prod_build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
