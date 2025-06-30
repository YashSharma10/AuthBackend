import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const MONGO_URI = 'mongodb://localhost:27017/backendtest';
mongoose.connect(MONGO_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
});

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api', authRoutes);
