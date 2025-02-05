# 1) Node.js 환경에서 Vite React 빌드
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable && yarn --version

COPY . /app
#도커 파일 빌드해서 cicd 할 때 필요한 작업인듯 합니다
RUN yarn install && yarn build

# 2) Nginx로 정적 파일 서빙
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
