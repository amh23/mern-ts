import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { dbInstance } from './config/db.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database initialization
async function initializeDatabase() {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mern_db";
    await dbInstance.connect(uri);
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
}

// Gracefully shutdown the database connection before app termination
async function closeDatabase() {
  try{
    await dbInstance.disconnect();
  } catch (error) {
    console.error("Error during database disconnection:", error);
  }
}


// Middleware
app.use(cors());
app.use(express.json());

// Start the server
async function startServer() {
  await initializeDatabase(); // Ensure DB is connected before starting the server

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });

  // Handle graceful shutdown (e.g., on Ctrl+C)
  process.on('SIGINT', async () => {
    console.log("Received SIGINT. Shutting down gracefully...");
    await closeDatabase();
    server.close(() => {
      console.log("Server shutdown complete.");
      process.exit(0);
    });  
  });

  process.on('SIGTERM', async () => {
    console.log("Received SIGTERM. Shutting down gracefully...");
    await closeDatabase();
    server.close(() => {
      console.log("Server shutdown complete.");
      process.exit(0);
    });
  }); 
  
}


// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});


