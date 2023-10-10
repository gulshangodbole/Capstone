# Use a base image with Node.js pre-installed
FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use a lightweight Nginx image as the final image
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]