import express from 'express';
import router from './routes/index';

/**
 * Create and configure Express server
 */
const app = express();
const PORT = 1245;

// Use the routes defined in routes/index.js
app.use('/', router);

// Start the server
app.listen(PORT);

// Export the app
export default app;
