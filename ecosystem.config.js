module.exports = {
  apps: [
    {
      name: 'dnApp',
      script: './.next/standalone/server.js',
      output: './logs/app.log',
      error: './logs/app.err',
      log_date_format: 'DD-MM-YYYY',
      args: 'start -p 3000',
      watch: ['./src'],
      cwd: './',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
