# Sử dụng image node phiên bản mong muốn làm base
FROM node:18

# Tạo một thư mục làm thư mục làm việc
WORKDIR /usr/src/client

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả các file trong thư mục hiện tại vào thư mục làm việc
COPY . .

# Truyền biến môi trường từ file .env vào Docker container
ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build React app
RUN npm run build

# Command để chạy ứng dụng ReactJS
CMD ["npm", "start"]
