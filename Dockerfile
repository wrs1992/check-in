# Dockerfile
FROM node:18 as build

# Add dumb-init binary from Yelp GitHub release
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Set working directory and copy application files
WORKDIR /app
COPY . /app

# Install only production dependencies
RUN npm install && npm run build --production

FROM node:18-alpine as main

WORKDIR /app

# copy from build image
COPY --from=build /app /app
COPY --from=build /usr/local/bin/dumb-init /usr/local/bin/

# Install necessary libraries for Chromium
RUN apk add --update --no-cache \
            chromium \
            && rm -rf /var/cache/apk/*

# Set up Chromium as puppeteer's executablePath
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Configure entrypoint and default command
ENTRYPOINT [ "/usr/local/bin/dumb-init", "--" ]
CMD [ "node", "./dist/test.js"]
