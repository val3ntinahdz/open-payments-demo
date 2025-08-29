const express = require('express')
const app = express();

const usuarios = [
    { nombre: "María", saldo: 90, ahorro: 10 },
    { nombre: "Guadalupe", saldo: 180, ahorro: 20 }

]

// Habilitando CORS middleware para que la app móvil pueda hablar con el servidor
const cors = require('cors');
app.use(cors());

app.get('/api/saldo', (req, res) => {
    res.json({ mensaje: "Los usuarios", usuarios})
})

app.listen(3000, () => {
    console.log("Running port 3000")
})
