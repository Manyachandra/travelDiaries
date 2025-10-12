// Vercel serverless entry: reuse the Express app exported from index.js
const app = require('./index');

module.exports = app;


