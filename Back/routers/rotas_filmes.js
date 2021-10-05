const express = require('express');
const router = express.Router();

const filmes = [
    {
        id: 1,
        nome: 'Tropa de Elite',
        imagem: 'https://img.moviesrankings.com/t/p/w1280/kT8UA0exarB9kFtknMupU0AjfWt.jpg',
        genero: 'Ação',
        nota: 10
    }
];

router.get('/', (req, res) => {
    res.send(filmes);
})

router.get('/:id', (req, res) => {
    const idParameters = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParameters)
    const filme = filmes[index];
    res.send(filme);
})

router.put('/:id', (req, res) => {
    const filmeEdit = req.body;
    const id = req.params.id;
    let filmePreCad = filmes.find((filme) => filme.id == id);

    filmePreCad.nome = filmeEdit.nome;
    filmePreCad.imagem = filmeEdit.imagem;
    filmePreCad.genero = filmeEdit.genero;
    filmePreCad.nota = filmeEdit.nota;

    res.send({
        message: `O filme: '${filmePreCad.nome}' foi atualizado!`,
        data: filmePreCad
    });
    
});

router.post('/add', (req, res) =>{
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'O filme foi cadastrado com sucesso!',
        data: filme
    });
});

router.delete('/:id', (req, res) =>{
    const id = req.params.id;
    const index = filmes.findIndex((filme) => filme. id == id);
    filmes.splice(index, 1);

    res.send({
        message: 'O filme foi excluído com sucesso!'
    })
})

module.exports = router;