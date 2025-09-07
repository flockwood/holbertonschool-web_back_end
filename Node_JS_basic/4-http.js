const http = require('http');

/**
 * Create HTTP server that responds with "Hello Holberton School!" for all endpoints
 */
const app = http.createServer((req, res) => {
  // Set response header for plain text
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send response body and end the response
  res.end('Hello Holberton School!');
});

// Listen on port 1245
const PORT = 1245;
app.listen(PORT);

// Export the app
module.exports = app;
