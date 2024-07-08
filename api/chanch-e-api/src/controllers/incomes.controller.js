require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.PORT
});

const getIncomesRecord = async (req, res) => {
    const response = await pool.query('SELECT * FROM public.incomes ORDER BY id DESC');
    res.json(response.rows);
}

const getActualSavings = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM public.incomes ORDER BY id DESC LIMIT 1');
        res.json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createIncome = async (req, res) => {
    const { last_income } = req.body;

    const response = await pool.query('SELECT * FROM public.incomes ORDER BY id DESC LIMIT 1');
    const { total_savings, incomes_count } = response.rows[0];

    const newTotalSavings = last_income + total_savings;
    const newIncomesCount = parseInt(incomes_count + 1);

    try {
        const response = await pool.query('INSERT INTO public.incomes (last_income, total_savings, incomes_count) VALUES ($1, $2, $3)', [last_income, newTotalSavings, newIncomesCount]);

        res.json({
            message: 'Income added successfully',
            body: {
                income: { last_income, newTotalSavings, newIncomesCount }
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const resetSavings = async (req, res) => {
    const newLastIncome = 0;
    const newTotalSavings = 0;
    const newIncomesCount = 0;

    const response = await pool.query('INSERT INTO public.incomes (last_income, total_savings, incomes_count) VALUES ($1, $2, $3)', [newLastIncome, newTotalSavings, newIncomesCount]);
    res.json({
        message: 'Savings reseted successfully',
        body: {
            incomes: { newLastIncome, newTotalSavings, newIncomesCount }
        }
    });
}

module.exports = {
    getIncomesRecord,
    getActualSavings,
    createIncome,
    resetSavings
}