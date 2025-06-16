const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Store tracking data in memory (in production, use a database)
const trackingData = {
  opens: new Map(),
  emails: new Map()
};

// Serve the tracking pixel
app.get('/track.png', (req, res) => {
  console.log('Received tracking pixel request');
  console.log('Query parameters:', req.query);
  console.log('Headers:', req.headers);
  
  const emailId = req.query.id;
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const timestamp = new Date().toISOString();

  if (emailId) {
    console.log(`Processing tracking for email ID: ${emailId}`);
    if (!trackingData.opens.has(emailId)) {
      console.log('Creating new tracking entry for email');
      trackingData.opens.set(emailId, []);
    }
    trackingData.opens.get(emailId).push({
      timestamp,
      userAgent,
      ip
    });
    console.log(`Email opened: ${emailId} at ${timestamp}`);
    console.log('User Agent:', userAgent);
    console.log('IP:', ip);
  } else {
    console.log('No email ID provided in request');
  }

  // Send the tracking pixel
  const pixelPath = path.join(__dirname, '../track.png');
  console.log('Sending tracking pixel from:', pixelPath);
  res.sendFile(pixelPath, (err) => {
    if (err) {
      console.error('Error sending tracking pixel:', err);
    } else {
      console.log('Tracking pixel sent successfully');
    }
  });
});

// API endpoint to get tracking data
app.get('/api/tracking/:emailId', (req, res) => {
  const { emailId } = req.params;
  console.log(`Fetching tracking data for email ID: ${emailId}`);
  const opens = trackingData.opens.get(emailId) || [];
  console.log(`Found ${opens.length} opens for this email`);
  res.json({ opens });
});

// Start server
app.listen(PORT, () => {
  console.log(`Tracking server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
}); 