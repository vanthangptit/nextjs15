module.exports = {
  apps: [
    {
      name: 'dnApp',
      script: 'node_modules/next/dist/bin/next',
      /**
        @@cwd là thư mục làm việc hiện tại khi PM2 chạy script
        Nếu bạn bỏ cwd, PM2 sẽ chạy script từ thư mục nơi bạn chạy lệnh pm2 start (tức thư mục hiện tại lúc deploy).
       */
      // cwd: './',
      watch: ['./src'],
      output: './logs/app.log',
      error: './logs/app.err',
      log_date_format: 'DD-MM-YYYY HH:mm'
    }
  ]
};
