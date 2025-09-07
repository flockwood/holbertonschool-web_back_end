const express = require('express');

/**
 * Create Express server
 */
const app = express();

/**
 * Define route for root endpoint
 */
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Listen on port 1245
const PORT = 1245;
app.listen(PORT);

// Export the app
module.exports = app;
