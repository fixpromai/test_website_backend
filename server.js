const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();


connectDB();

const app = express();

// Parse cookies
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'chrome-extension://cejpfeidcnlhkbifoimldjhjiijldold',
  'https://chat.openai.com',
  'https://chatgpt.com',
  'https://gemini.google.com',
  'https://claude.ai',
  'https://v0.dev',
  'https://copilot.microsoft.com',
  'https://copilot.live',
  'https://bing.com',
  'https://chat.deepseek.com',
  'https://deepseek.com',
  'https://perplexity.ai',
  'https://www.perplexity.ai',
  'https://x.ai',
  'https://grok.x.ai',
  'https://grok.com',
  'https://xai.com',
  'https://you.com',
  'https://poe.com',
  'https://lovable.dev',
  'https://veo3.ai',
  'https://www.canva.com'
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS Blocked Origin:', origin);
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true
}));

// Parse JSON body
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const userPromptRoutes = require('./routes/userPromptRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/prompts', userPromptRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
