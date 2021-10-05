const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

const filmeRotas = require('./routers/rotas_filmes');

app.use('/filmes', filmeRotas);

app.get('/', (req, res) => {
    res.send('Olá! Chegue mais, faça bom uso!');
})

const port = 3000;

app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}/`);
})