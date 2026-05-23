import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';
import apiRoutes from './routes/api';

// Load environmental parameters
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing for the Next.js client
app.use(cors({
  origin: '*', // Allow all origins for dev simplicity
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Express Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Master Api Routes
app.use('/api', apiRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    time: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Boot up sequence
const startServer = async () => {
  // Connect MongoDB (with elegant offline fallback logic)
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Cybernetic API server listening on http://localhost:${PORT}`);
    console.log(`⚡ API Namespace active on http://localhost:${PORT}/api`);
  });
};

startServer().catch(err => {
  console.error('💥 Failed to start Express server:', err);
});
