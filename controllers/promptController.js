const PromptHistory = require('../models/PromptHistory');

exports.savePrompt = async (req, res) => {
  try {
    const email = req.user.email;
    const { rawPrompt, polishedPrompt } = req.body;

    if (!rawPrompt || !polishedPrompt) {
      return res.status(400).json({ error: 'Missing prompt fields' });
    }

    // Check if user document exists
    let promptDoc = await PromptHistory.findOne({ email });

    if (promptDoc) {
      promptDoc.prompts.push({ rawPrompt, polishedPrompt });
      await promptDoc.save();
    } else {
      promptDoc = new PromptHistory({
        email,
        prompts: [{ rawPrompt, polishedPrompt }]
      });
      await promptDoc.save();
    }

    res.status(201).json({ message: 'Prompt saved successfully', promptDoc });

  } catch (error) {
    console.error('Save prompt error:', error.message);
    res.status(500).json({ error: 'Failed to save prompt history' });
  }
};

exports.getPromptHistory = async (req, res) => {
  try {
    const email = req.user.email; // from JWT

    const history = await PromptHistory.findOne({ email });

    if (!history) {
      return res.status(200).json({ prompts: [] }); // no history yet
    }

    res.status(200).json({ prompts: history.prompts });
  } catch (err) {
    console.error('Error fetching prompt history:', err.message);
    res.status(500).json({ error: 'Failed to fetch prompt history' });
  }
};