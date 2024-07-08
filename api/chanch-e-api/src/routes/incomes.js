const {Router} = require('express');
const router = Router();

const { getIncomesRecord, getActualSavings, resetSavings, createIncome } = require('../controllers/incomes.controller');

router.get('/api/incomes', getIncomesRecord);
router.get('/api/incomes/last', getActualSavings);
router.post('/api/incomes', createIncome);
router.post('/api/incomes/reset', resetSavings);

module.exports = router;