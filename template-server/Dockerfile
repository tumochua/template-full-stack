# Sử dụng một image node phiên bản mong muốn làm base
FROM node:18

# Tạo một thư mục làm thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .
# Truyền các biến môi trường từ file .env vào Docker container
ARG PORT
ARG NODE_ENV
ARG ACCESS_TOKEN
ARG REFRESH_TOKEN

ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV ACCESS_TOKEN=$ACCESS_TOKEN
ENV REFRESH_TOKEN=$REFRESH_TOKEN

EXPOSE $PORT

# Expose cổng mà server của bạn chạy trên
EXPOSE 8000

# Command để chạy ứng dụng của bạn
CMD ["npm", "start"]
