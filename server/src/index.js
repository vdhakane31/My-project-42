import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import placementRoutes from './routes/placementRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Smart Placement Predictor API' });
});

app.use('/api/auth', authRoutes);
app.use('/api', placementRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
