// Quick test to verify Express 4 works
import express from 'express';

const app = express();
const PORT = 5001; // Use different port to avoid conflicts

app.get('/test', (req, res) => {
  res.json({ message: 'Express 4 is working!', expressVersion: '4.x' });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`✅ Express 4 is working correctly!`);
  console.log(`✅ Test it: http://localhost:${PORT}/test`);
  console.log(`\n⏹️  Press Ctrl+C to stop`);
});

