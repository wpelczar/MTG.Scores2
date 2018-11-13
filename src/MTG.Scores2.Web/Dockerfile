FROM stefanscherer/node-windows:10.13 AS build-env

WORKDIR /app

RUN npm install -g @angular/cli@6.1.5 --silent

COPY package.json package.json

RUN npm install --silent
COPY . .
RUN ng build --prod --build-optimizer

FROM sixeyed/nginx:windowsservercore
COPY --from=build-env /app/dist/web C:/nginx/html
COPY /nginx.conf C:/nginx/conf/nginx.conf



