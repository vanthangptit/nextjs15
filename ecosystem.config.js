module.exports = {
  apps: [
    {
      name: 'dnApp',
      script: 'node_modules/next/dist/bin/next',
      watch: ['./src'],
      output: './logs/app.log',
      error: './logs/app.err',
      log_date_format: 'DD-MM-YYYY HH:mm'
    }
  ]
};
