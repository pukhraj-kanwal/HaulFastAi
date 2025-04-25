import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Express = express();
const port = process.env.PORT || 3001; // Default port for asset-service

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for health check
app.get('/', (req: Request, res: Response) => {
  res.send('Asset Service is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Asset Service is running at http://localhost:${port}`);
});

// Basic error handling (can be expanded)
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app; // Export for potential testing or programmatic use