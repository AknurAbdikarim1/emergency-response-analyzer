# emergency-response-analyzer

# 🌐 Emergency Response Analyzer

A GPT-4o-powered Next.js application that analyzes satellite images to assess emergency situations. Users input an image URL, and the app returns a detailed analysis of infrastructure damage, road blockages, and recommended actions.

<img width="1467" height="755" alt="image" src="https://github.com/user-attachments/assets/8463edad-67a3-404c-8fda-d29c5d2a3ac8" />
<img width="1462" height="874" alt="image" src="https://github.com/user-attachments/assets/083dbb1c-d3ff-4e3c-aeb9-7487ddf6ded8" />
Here is the deployed app: https://emergency-response-analyzer-xmym.vercel.app/
---

## 🚀 Features

- 🔍 Satellite image analysis for emergency response
- 🧠 GPT-4o integration via OpenAI API
- 🧭 Text-based report: buildings, roads, critical infrastructure
- 🌐 Modern UI with image preview and Markdown-formatted output
- 🧪 Built using Next.js App Router with API routes

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind, ShadCN UI
- **Backend**: API Routes (Edge-compatible)
- **AI**: OpenAI GPT-4o
- **Deployment**: Vercel

---

## 📦 Setup

### 1. Clone the repository

```bash
git clone https://github.com/AknurAbdikarim1/emergency-response-analyzer.git
cd emergency-response-analyzer

🛠 Local Development Setup
Follow these steps to run the project locally:

1. Install Dependencies
npm install

Installs all project dependencies defined in package.json.

2. Configure Environment Variables
Create a .env.local file in the root of the project and add your OpenAI key:
OPENAI_API_KEY=sk-xxxxxx-your-openai-api-key

🔐 This file is ignored by Git and should never be committed.

3. Run Locally
npm run dev

The app will start on: http://localhost:3000
Visit that URL in your browser to use the app.
