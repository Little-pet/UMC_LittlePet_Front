# 1) Node.js 환경에서 React/Vue 빌드
FROM node:20-alpine AS build
WORKDIR /app
COPY . /app

# Yarn 설치
RUN npm install -g yarn

# 의존성 설치 및 빌드
RUN yarn install && yarn build

# 2) Nginx로 정적 파일 서빙
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html  # React는 build, Vue는 dist
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]