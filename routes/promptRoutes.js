const express = require('express');
const router = express.Router();
const { savePrompt, getPromptHistory } = require('../controllers/promptController');

const verifyToken = require('../middlewares/verifyToken');

router.post('/save', verifyToken, savePrompt);
router.get('/history', verifyToken, getPromptHistory);

module.exports = router;
