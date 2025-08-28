const express = require('express')
const app = express();

app.get('/api/saldo', (req, res) => {
    res.json({
        saldo: 90,
        ahorro: 10
    })
})

app.listen(3000, () => {
    console.log("Running port 3000")
})