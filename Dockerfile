###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Installing necessary build tools
RUN apk add --no-cache --virtual .build-deps gcc g++ make python3 && ln -s python3 /usr/local/bin/python

# Create app directory
WORKDIR /usr/src/app

ENV NODE_ENV development

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# list files to ensure they've been copied correctly
# RUN ls -al /usr/src/app/

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN NODE_ENV=development npm i

# RUN npm rebuild bcrypt --build-from-source

# Bundle app source
COPY --chown=node:node . .

# RUN chmod -R 777 /usr/src/app/dist

# Use the node user from the image (instead of the root user)
USER node