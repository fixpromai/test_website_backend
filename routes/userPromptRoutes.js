const express = require('express');
const router = express.Router();
const { savePromptToUser, getUserPrompts } = require('../controllers/userPromptController');
const verifyUserToken = require('../middlewares/verifyUserToken');

router.post('/save', verifyUserToken, savePromptToUser);
router.get('/all', verifyUserToken, getUserPrompts);

module.exports = router;
