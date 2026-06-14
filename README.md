# Code-9- Community Ecosystem

![Code-9- Hero Banner](https://ai.google.dev/static/site-assets/images/share-ais-513315318.png)

Welcome to the **Code-9-** repository! 

Code-9- is an elite, multi-disciplinary, cybernetic ecosystem for vanguard developers, creators, systems engineers, and digital architects preparing for the autonomous future. This application serves as the interactive landing page, digital gateway, and neural connection point for prospective Code-9- community members.

It features a high-craft, cyberpunk-inspired visual language, smooth micro-animations, and a fully functional AI-powered Chatbot Assistant capable of answering questions about the Code-9- ecosystem.

---

## ⚡ Features

- **Immersive Cybernetic UI**: High-craft frontend with dynamic neon glassmorphism, responsive light/dark themes, and advanced micro-animations built using `framer-motion`.
- **Interactive 3D Antigravity Field**: A custom, pointer-reactive 3D particle simulation driven by `@react-three/fiber` that creates an interactive 'magnetic' background effect without blocking page interactions.
- **AI Cybernetic Assistant (Chatbot)**: A custom conversational interface that connects to a **Llama 3.1 8B Instruct** model via the Hugging Face Serverless API to provide intelligent, contextual guidance to users.
- **Modular Component Architecture**: Extensively modularized component architecture ensuring clean, maintainable, industry-standard React code.
- **Serverless API Ready**: Supports Vercel's Node.js Serverless Functions for seamless API deployment, alongside local Express integrations.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion), React Three Fiber (Three.js)
- **Icons**: Lucide React
- **Backend**: Express.js (Local), Vercel Serverless Functions (Production)
- **AI Integration**: Hugging Face Inference API (`meta-llama/Llama-3.1-8B-Instruct`)
- **Deployment**: Vercel

---

## 🚀 Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A **Hugging Face API Token** (Required for the AI Chatbot). You can get one for free at [Hugging Face](https://huggingface.co/settings/tokens).

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Pranav00076/Code-9-.git
   cd Code-9-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Ensure you have a `.env` file in the root of the project. If not, copy `.env.example` to `.env` and add your Hugging Face Token:
   ```env
   # .env
   HF_TOKEN="your_hugging_face_token_here"
   ```

### Local Development

To run the local development server, which starts both the Vite frontend and the Express backend API simultaneously:

```bash
npm run dev
```

Your app will be available at [http://localhost:3000](http://localhost:3000). 
*(Note: If you receive an `EADDRINUSE` error for port 3000, ensure no other tasks or servers are currently running on that port).*

---

## ☁️ Deployment (Vercel)

This application is architected to be deployed directly to Vercel without requiring complex configuration. The custom API is already separated into the `api/index.ts` file, making it fully compatible with Vercel Serverless Functions out of the box.

1. **Link your Vercel project**:
   ```bash
   npx vercel link
   ```
2. **Push your environment variables to Vercel**:
   Ensure your `.env` is loaded by either pushing it via the Vercel Dashboard, or using the CLI:
   ```bash
   npx vercel env add HF_TOKEN production
   ```
3. **Deploy**:
   ```bash
   npx vercel --prod
   ```

---

## 🤝 Contributing

We welcome contributions to expand the Nexus! If you're a builder preparing for the autonomous future:
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/CyberEnhancement`).
3. Commit your changes (`git commit -m 'Add some CyberEnhancement'`).
4. Push to the Branch (`git push origin feature/CyberEnhancement`).
5. Open a Pull Request.

---

> *"The Code-9 community is not just a group; it is a vanguard movement building the infrastructure for tomorrow."*
