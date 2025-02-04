const express = require('express');
const app = express();

// Set up SSE endpoint
app.get('/events', (req, res) => {
    // Set headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // Send initial event
    res.write('data: Connected\n\n');
    // Set interval to send periodic events
    const intervalId = setInterval(() => {
      res.write('data: Hello, world!\n\n');
    }, 1000);
    // Clean up on connection close
    req.on('close', () => {
      clearInterval(intervalId);
      console.log('Bye!');
    });
  });
  // Start server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });