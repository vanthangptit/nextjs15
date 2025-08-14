// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'dnApp',
      script: 'server.js',
      cwd: __dirname + '/.next/standalone',
      watch: false,
      output: path.join(__dirname, 'logs/app.log'),
      error: path.join(__dirname, 'logs/app.err'),
      log_date_format: 'DD-MM-YYYY HH:mm'
    }
  ]
};
