FROM node:17.9-alpine3.15 AS base
COPY ./ /
ENV GENERATE_SOURCEMAP=false
RUN npm install --legacy-peer-deps
RUN npm run build
