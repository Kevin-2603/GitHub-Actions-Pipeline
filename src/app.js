const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server running smoothly!' });
});

app.get('/api/info', (req, res) => {
  res.status(200).json({
    app_name: 'DevOps CI/CD Portfolio App',
    environment: process.env.NODE_ENV || 'development',
    deployed_via: 'GitHub Actions to Render.com'
  });
});

module.exports = app;
