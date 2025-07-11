const mongoose = require('mongoose');

const singlePromptSchema = new mongoose.Schema({
  rawPrompt: { type: String, required: true },
  polishedPrompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userPromptSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  prompts: [singlePromptSchema]
});

module.exports = mongoose.model('UserPrompt', userPromptSchema);
