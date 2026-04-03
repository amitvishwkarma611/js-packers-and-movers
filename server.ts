import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import Razorpay from 'razorpay';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API to save the icon
  app.post('/api/save-icon', (req, res) => {
    const { imageData } = req.body;
    if (!imageData) return res.status(400).json({ error: 'No image data provided' });

    try {
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      const iconPath = path.join(process.cwd(), 'public', 'icon.png');
      
      // Ensure public directory exists
      const publicDir = path.join(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
      }

      fs.writeFileSync(iconPath, buffer);
      res.json({ success: true, path: '/icon.png' });
    } catch (error) {
      console.error('Error saving icon:', error);
      res.status(500).json({ error: 'Failed to save icon' });
    }
  });

  app.post('/api/create-razorpay-order', async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ error: 'Razorpay keys are not configured' });
      }

      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: Math.round(amount * 100), // amount in smallest currency unit
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      res.json({ order, keyId: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
