import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser limit safe
  app.use(express.json());

  // API Route: Secure Chatbot proxy for Hugging Face Router API
  app.post('/api/chatbot', async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Messages array is required.' });
        return;
      }

      const hfToken = process.env.HF_TOKEN;
      if (!hfToken) {
        res.status(500).json({ 
          error: 'HF_TOKEN is not configured on the server. Please add it to your secrets or .env.' 
        });
        return;
      }

      // Inject system context to reinforce Code9 premium futuristic branding and guidelines
      const systemMessage = {
        role: "system",
        content: `You are the Code9 Cybernetic Assistant, a highly intelligent terminal entity for the "Code9 Community". 
You represent Code9, which is an elite cooperative multi-disciplinary ecosystem for vanguard developers, creators, systems engineers, and digital architects preparing the autonomous future.
Your tone should be futuristic, sophisticated, precise, and tech-forward. Maintain a highly professional and welcoming posture. 
Keep answers clean, structured (using markdown where appropriate), and concise unless deep technical explanation is requested. 
You can talk about Code9's core features described below:
- 500+ Members, 50+ Projects Shipped, 20+ Expert Mentors.
- Key areas: Web Development (React, WASM), App Development (React Native), SEO optimization, Video editing/3D motion, Tech Support/DevOps, Learning Resources/Vaults, Lab-9 Edge Robotics.
- Benefits: Guild Co-shipping, private networking circles, paid bounties/challenges, rigorous mentorship, and T-shaped expert development.
- Active Projects: Nexus-9 Gateway, CyberShield Firewall Agent, Orion OS Edge Kernel, Hex Crypt Peer Messenger.`
      };

      const payloadMessages = [systemMessage, ...messages];

      const hfResponse = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
          headers: {
            "Authorization": `Bearer ${hfToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            messages: payloadMessages,
            model: "meta-llama/Llama-3.1-8B-Instruct:novita",
          }),
        }
      );

      if (!hfResponse.ok) {
        const errorText = await hfResponse.text();
        console.error('Hugging Face API returned error:', errorText);
        res.status(hfResponse.status).json({ 
          error: `Hugging Face API Error: ${hfResponse.statusText}`, 
          details: errorText 
        });
        return;
      }

      const result = await hfResponse.json();
      res.json(result);
    } catch (err: any) {
      console.error('Chatbot endpoint error:', err);
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
  });

  // Health-check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'active', node: 'NEXUS-9', uptime: process.uptime() });
  });

  // Vite Integration for Serving UI Assets
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
    console.log(`[CODE9] Full-stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start full-stack server:", error);
});
