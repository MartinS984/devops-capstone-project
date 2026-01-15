const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS so Frontend can communicate with Backend
app.use(cors());

// Database Connection (Will be used in later steps)
// We use process.env to grab the DB URL from Kubernetes later
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";

// Simple API Endpoint
app.get('/api/home', (req, res) => {
  res.json({ message: 'Hello from the Backend (Tier 2)!' });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});