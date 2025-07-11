const UserPrompt = require('../models/UserPrompt');


exports.savePromptToUser = async (req, res) => {
    
    const { rawPrompt, polishedPrompt } = req.body;
    const email = req.user.email; // This comes from decoded JWT

    if (!rawPrompt || !polishedPrompt || !email) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const newPrompt = { rawPrompt, polishedPrompt };

    try {
        let userDoc = await UserPrompt.findOne({ email });

        if (!userDoc) {

            userDoc = new UserPrompt({
                email,
                prompts: [newPrompt]
            });
        } else {

            userDoc.prompts.push(newPrompt);
        }

        await userDoc.save();
        res.status(200).json({ message: 'Prompt saved successfully' });

    } catch (err) {
        console.error("Error saving prompt:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserPrompts = async (req, res) => {
  const email = req.user.email;

  try {
    const userDoc = await UserPrompt.findOne({ email });

    if (!userDoc || !userDoc.prompts || userDoc.prompts.length === 0) {
      return res.status(200).json({ prompts: [] });
    }

    res.status(200).json({ prompts: userDoc.prompts });
  } catch (err) {
    console.error("Error fetching prompts:", err);
    res.status(500).json({ message: 'Server error' });
  }
};
