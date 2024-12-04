FROM node:20-alpine AS build

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

ARG APP_API_URL=https://localhost:3000/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:1.25-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY env.sh /docker-entrypoint.d/env.sh

RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

