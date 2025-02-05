# 1) Node.js 환경에서 Vue 빌드
FROM node:20-alpine AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build

# 2) Nginx로 정적 파일 서빙
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
