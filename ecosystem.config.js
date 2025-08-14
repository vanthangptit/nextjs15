module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'dnApp',
      script: 'node',
      args: '--max-old-space-size=512 ./node_modules/next/dist/bin/next start',
      watch: false,
      output: './logs/app.log',
      error: './logs/app.err',
      log_date_format: 'DD-MM-YYYY HH:mm'
    }
  ]
};
