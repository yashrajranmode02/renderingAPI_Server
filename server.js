import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;
const VALID_KEYS = (process.env.API_KEYS || '').split(',');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', time: new Date() });
});

// API endpoint with key validation (Route Parameter version)
app.get('/api/info/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey; // Now we read from route param

  if (!apiKey || !VALID_KEYS.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }

  let data;

  if (apiKey === '12345') {
    data = {
      plan: 'Free Tier',
      limit: '100 requests/day',
      features: ['Basic API Access', 'Health Check']
    };
  } else if (apiKey === '67890') {
    data = {
      plan: 'Premium Tier',
      limit: 'Unlimited requests',
      features: ['Full API Access', 'Priority Support', 'Advanced Analytics']
    };
  }

  res.json({
    message: 'Valid API Key',
    data
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
