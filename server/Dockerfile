FROM node:12 AS builder

WORKDIR /app
COPY ./package* /app/
RUN npm ci
COPY . /app

FROM node:12-slim

WORKDIR /app
COPY --from=builder /app/src /app/src
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

CMD npm run start