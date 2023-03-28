FROM node:18-alpine

WORKDIR /asset

# Copy package.json and package-lock.json
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy source code
COPY src ./
COPY tsconfig.json ./
RUN npm run build
# Remove dev dependencies
RUN npm prune --production