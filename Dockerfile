# ---- Base Node ----
FROM node:12-stretch AS base
# set working directory
WORKDIR /usr/src/pacifica-metadata-mgmt
# Set running user PATH
ENV PATH /usr/src/pacifica-metadata-mgmt/node_modules/.bin:$PATH
# copy project file
COPY package.json .
COPY package-lock.json .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --silent
COPY . .
# Create Production build
RUN npm run build

#
# ---- Test ----
# run linters, setup and tests (if appropriate)
FROM dependencies AS test
RUN  npm run eslint

#
# ---- Release ----
FROM nginx
COPY --from=dependencies /usr/src/pacifica-metadata-mgmt/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
