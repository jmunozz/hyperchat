FROM node:12 AS builder

ARG REACT_APP_SERVER_HOST
ARG REACT_APP_SERVER_PORT
ENV REACT_APP_SERVER_HOST $REACT_APP_SERVER_HOST
ENV REACT_APP_SERVER_PORT $REACT_APP_SERVER_PORT

WORKDIR /app
COPY ./package* /app/
RUN npm ci
COPY . /app
RUN echo "build with server host: $REACT_APP_SERVER_HOST:$REACT_APP_SERVER_PORT"
RUN yarn build

FROM node:12-slim

RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

CMD npm run start:prod