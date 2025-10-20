const express = require('express');
const webhookHandler = require('./api/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies (Twilio sends data this way)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'WhatsApp webhook server is running' });
});

// Webhook endpoints
app.post('/webhook', webhookHandler);
app.post('/api/webhook', webhookHandler);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
