import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import couponRoutes from './routes/coupon.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/v1/coupons', couponRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
