# 🌐 Code-9- Community Ecosystem

> **Code-9-** is an elite, multi-disciplinary, cybernetic ecosystem for vanguard developers, creators, systems engineers, and digital architects preparing for the autonomous future. 

This application serves as the interactive landing page, digital gateway, and neural connection point for prospective Code-9- community members. It features a high-craft, cyberpunk-inspired visual language, smooth micro-animations, and a fully functional AI-powered Chatbot Assistant capable of answering questions about the Code-9- ecosystem.

---

## ⚡ Core Features

- **Immersive Cybernetic UI**: High-craft frontend with dynamic neon glassmorphism, responsive light/dark themes, and advanced micro-animations built using `framer-motion`.
- **Interactive 3D Antigravity Field**: A custom, pointer-reactive 3D particle simulation driven by `@react-three/fiber` that creates an interactive 'magnetic' background effect without blocking page interactions.
- **AI Cybernetic Assistant (Chatbot)**: A custom conversational interface that connects to a **Llama 3.1 8B Instruct** model via the Hugging Face Serverless API to provide intelligent, contextual guidance to users.
- **Dynamic Dashboards & Data Visualization**: Integrates complex metric visualizations and data tracking charts using `recharts` to monitor community metrics.
- **Gaming & Projects Hub**: Dedicated sections to track active vanguard projects (like Nexus-9 Gateway, CyberShield Firewall Agent) and gaming statistics.
- **Real-Time Activity Feed**: A custom event stream component reflecting the pulse of the community's operations.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: React 19 + Vite
- **Language**: TypeScript (`tsx`)
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion), React Three Fiber (Three.js)
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Backend API**: Express.js (Local), Vercel Serverless Functions (Production)
- **AI Integration**: Hugging Face Inference API (`meta-llama/Llama-3.1-8B-Instruct`)
- **Deployment**: Vercel

---

## 📁 Project Structure

```text
Code-9-/
├── api/                   # Serverless Express API functions (Hugging Face integration)
├── public/                # Static assets & 3D models
├── src/
│   ├── components/        # Modular React components (Navbar, Home, ActivityFeed, Chatbot, etc.)
│   ├── App.tsx            # Main application root and routing logic
│   ├── data.ts            # Static data configurations and text content
│   ├── index.css          # Tailwind and global typography styles
│   └── main.tsx           # Entry point
├── server.ts              # Local Express server for full-stack dev
├── package.json           # Project dependencies and scripts
└── vercel.json            # Vercel deployment configuration
```

---

## 🚀 Getting Started

Follow these steps to get the application running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A **Hugging Face API Token** (Required for the AI Chatbot). You can get one for free at [Hugging Face](https://huggingface.co/settings/tokens).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pranav00076/Code-9-.git
   cd Code-9-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of the project. If not, copy `.env.example` to `.env` and add your Hugging Face Token:
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
