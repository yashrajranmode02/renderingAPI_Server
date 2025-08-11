import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;
const VALID_KEYS = (process.env.API_KEYS || '').split(',').map(k => k.trim());

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Root route for Render
app.get('/api/info/:api', (req, res) => {

  res.send(
    {
        url:"www/google.com"
    }
  );
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', time: new Date() });
});

// API endpoint with key validation
app.get('/api/info/:apiKey', (req, res) => {
  const apiKey = req.params.apiKey;

  if (!apiKey || !VALID_KEYS.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }

let data;

  res.json({
    message: 'Valid API Key',
    url:"https://random.com"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
