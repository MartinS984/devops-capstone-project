const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080; // Running on port 8080 to avoid conflict with Backend (3000)

// Environment variable for Backend URL (will be set in Kubernetes)
// Default to localhost for local testing
const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

app.get('/', async (req, res) => {
  try {
    // The Frontend calls the Backend API here
    const response = await axios.get(`${backendUrl}/api/home`);
    const backendMessage = response.data.message;

    res.send(`
      <h1>DevOps Capstone - 3 Tier App</h1>
      <p>Frontend: <span style="color:green;">Running</span></p>
      <p>Backend Response: <b>${backendMessage}</b></p>
    `);
  } catch (error) {
    res.send(`
      <h1>DevOps Capstone - 3 Tier App</h1>
      <p>Frontend: <span style="color:green;">Running</span></p>
      <p>Backend: <span style="color:red;">Failed to connect</span> (Is it running?)</p>
      <p>Error: ${error.message}</p>
    `);
  }
});

app.listen(port, () => {
  console.log(`Frontend running on port ${port}`);
});