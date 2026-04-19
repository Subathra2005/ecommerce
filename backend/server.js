require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');


const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'https://ecommerce-2005.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
  credentials: false
}));
app.use(express.json());
app.use(bodyParser.json());
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
app.use('/api/admin',adminRoutes);
app.use('/api/cart',cartRoutes);
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
console.log(`Server is running at: http://localhost:${PORT}`);
});

