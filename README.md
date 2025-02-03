# MathQuest - Dynamic Question Generator

## 🚀 Overview
Math Engine is a **full-stack Next.js application** that dynamically generates math problems for users in real time. Designed to be **scalable and efficient**, this project features a custom-built **Math Engine** on the server side that generates and manages math questions per user attempt. The system is optimized for low-latency, ensuring seamless user interaction.

## 🎯 Key Features
- **Dynamically Generated Questions**: Every attempt generates a unique set of questions using a server-side Math Engine.
- **Per-Attempt State Management**: Each attempt has an associated Math Engine instance that persists throughout the session.
- **Scalable Backend**: Built using **Next.js App Router** with API routes for efficient question generation and retrieval.
- **Authentication & User Session Management**: Uses **Supabase** for authentication, ensuring secure and persistent user tracking.
- **Real-Time Attempt Tracking**: A **React-based client** with a real-time timer component to track progress.
- **Optimized Data Fetching**: Uses **fetch API** and server actions for retrieving and submitting responses efficiently.
- **Tailwind CSS for Styling**: Ensures a clean and responsive UI across different screen sizes.

## 🛠 Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js Server Components, Supabase (PostgreSQL for storage)
- **Authentication**: Supabase Auth
- **Hosting Considerations**: Exploring cost-effective alternatives like Render/Fly.io for scalability

## ⚙️ How It Works
1. **User starts an attempt** → A unique `attemptSlug` is created and tied to a new Math Engine instance.
2. **Math Engine generates questions** dynamically based on predefined difficulty rules.
3. **User submits answers** → Responses are processed via API routes, and results are stored.
4. **Attempt completion** → The Math Engine instance is cleared from memory.

## 📦 Setup & Installation
```sh
# Clone the repository
git clone https://github.com/yourusername/math-engine.git
cd math-engine

# Install dependencies
npm install

# Create a .env.local file with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Start the development server
npm run dev
```

## 🌍 Deployment Considerations
- **Local Development**: Run `npm run dev`.
- **Production Build**: Use `npm run build && npm run start`.
- **Hosting Options**: Currently hosted on Vercel. Evaluating **Render, or self-hosting** to minimize costs.

## 🔥 Why This Project Stands Out
- **Custom Algorithmic Problem Generation** → Not static, but dynamically created on demand.
- **Efficient State Management** → Ensures per-attempt isolation while keeping the backend lightweight.
- **Next.js Server Actions** → Makes data retrieval & submission seamless.
- **Scalable Design** → Built to support high user volume with minimal hosting overhead.

