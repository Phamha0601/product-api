const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const productRoutes = require('./routes/products');

const app = express();

// Middleware đọc JSON
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // API routes
    app.use('/api/products', productRoutes);

    // Health check
    app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        message: 'Product API is running'
      });
    });

    // Start server
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Product API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });