FROM node:10.15.0 AS build-env

WORKDIR /app

RUN npm install -g @angular/cli@6.1.5 --silent

COPY MTG.Scores2.Web/package.json package.json

RUN npm install --silent
COPY MTG.Scores2.Web/ .
RUN ng build --prod --build-optimizer

FROM nginx:1.15.8
COPY --from=build-env /app/dist/web /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf



