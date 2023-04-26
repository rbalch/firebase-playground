FROM node:14-slim
LABEL maintainer="ryan@balch.io"

# install typescript
RUN npm install --global typescript@4.2.2