const express = require('express');
const router = express.Router();
const { createLoan, getAllLoans, getLoanById, updateLoan, deleteLoan } = 
require('../controllers/loanController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/loans', authMiddleware, createLoan);

router.get('/loans', authMiddleware, getAllLoans);

router.get('/loans/:id', authMiddleware, getLoanById);

router.put('/loans/:id', authMiddleware, updateLoan);

router.delete('/loans/:id', authMiddleware, deleteLoan);

module.exports = router;
