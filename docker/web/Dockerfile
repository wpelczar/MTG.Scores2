FROM stefanscherer/node-windows:10.13 AS build-env

WORKDIR /app

RUN npm install -g @angular/cli@6.1.5 --silent

COPY src/MTG.Scores2.Web/package.json package.json

RUN npm install --silent
COPY src/MTG.Scores2.Web/ .
RUN ng build --prod --build-optimizer

FROM sixeyed/nginx:windowsservercore
COPY --from=build-env /app/dist/web C:/nginx/html
COPY docker/web/nginx.conf C:/nginx/conf/nginx.conf



