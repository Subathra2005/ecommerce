require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');


const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    const isVercelPreview = typeof origin === 'string' && origin.endsWith('.vercel.app');
    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
  credentials: true
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
app.listen(PORT, () => {
console.log(`Server is running at: http://localhost:${PORT}`);
});

