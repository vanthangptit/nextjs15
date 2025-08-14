module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'dnApp',
      script: '.next/standalone/server.js',
      cwd: __dirname + '/.next/standalone',
      watch: false,
      output: './logs/app.log',
      error: './logs/app.err',
      log_date_format: 'DD-MM-YYYY HH:mm'
    }
  ]
};
