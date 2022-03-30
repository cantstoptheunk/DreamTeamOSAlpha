FROM node:17-alpine3.14
# Create app directory
WORKDIR /dreamteam/backend

# Use latest version of npm
RUN npm i npm@latest -g

# Copy app source code
COPY . .

# Install packages
RUN npm install --no-optional && npm cache clean --force

# Solves docker sh: ts-node: not found since linux needs typescript to be installed globally
RUN npm install -g ts-node

RUN npm run build

# # Expose port and start application
EXPOSE 8080

# Has hot reload
CMD [ "npm", "run", "dev"]