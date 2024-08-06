const express = require('express');
const { createVoterCard, getVoterCard } = require('../controllers/voterCardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createVoterCard);
router.get('/', authMiddleware, getVoterCard);

module.exports = router;
