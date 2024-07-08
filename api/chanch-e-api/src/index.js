require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json());

const db = process.env.DATABASE_URL;

// Rutas
app.get('/', (req, res) => {
    res.send('Hello World!')
})
 
app.use(require('./routes/incomes'))


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

/*
    Tabla ingresos
    - id: autoincrement pk
    - last_income: number (última moneda ingresada)
    - savings_total: number (total de ahorros sumados)
    - income_date: datetime (por defecto toma la fecha y hora actual)
*/