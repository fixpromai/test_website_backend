const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  rawPrompt: { type: String, required: true },
  polishedPrompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const promptHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // ensures one document per user
    lowercase: true,
    trim: true
  },
  prompts: {
    type: [promptSchema], // embedded array of subdocuments
    default: []
  }
});

module.exports = mongoose.model('PromptHistory', promptHistorySchema);
