FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

# Copy từ builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY pm2-log-file.json ./pm2-log-file.json

# Tạo thư mục log
RUN mkdir -p ./logs

# Cài pm2
RUN npm install -g pm2

# Expose và start
EXPOSE 3000
CMD ["pm2-runtime", "pm2-log-file.json", "--env", "production"]
