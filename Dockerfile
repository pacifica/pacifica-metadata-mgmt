FROM node:10-stretch
WORKDIR /opt/pacifica-metadata-mgmt
COPY . /opt/pacifica-metadata-mgmt
RUN chown -R node:node /opt/pacifica-metadata-mgmt
USER node
EXPOSE 3000
RUN npm install
CMD ["npm", "start"]
