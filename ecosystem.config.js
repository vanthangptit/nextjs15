import path from 'path';

module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'dnApp',
      script: '.next/standalone/server.js',
      cwd: path.join(__dirname, '.next', 'standalone'),
      watch: false,
      output: path.join(__dirname, 'logs/app.log'),
      error: path.join(__dirname, 'logs/app.err'),
      log_date_format: 'DD-MM-YYYY HH:mm'
    }
  ]
};
