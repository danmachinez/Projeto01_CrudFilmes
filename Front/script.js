const urlApi = 'http://localhost:3000/filmes';
const lista = document.getElementById('lista');

let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
	const response = await fetch(urlApi);

	const data = await response.json();
  console.log(data);

  data.map((filme) => {
    lista.insertAdjacentHTML('beforeend', `
        <h2>Filme: <span class="nomeFilme">${filme.nome}</span></h2>
        <img class="urlImg"src="${filme.imagem}">
        <p>Gênero: <span class="generoFilme">${filme.genero}</span></p>
        <p>Nota: <span class="nota">${filme.nota}</span></p>
        <button type="button" class="button" onclick="putFilme(${filme.id})">Editar</button>
        <button type="button" class="button" onclick="deleteFilme(${filme.id})">Excluir</button>
    `)
})

}
getFilmes();

const submitForm = async (evento) => {
  evento.preventDefault();

  let nome = document.getElementById('nome');
  let imagem = document.getElementById('imagem');
  let genero = document.getElementById('genero');
  let nota = document.getElementById('nota');

  const filme = {
      nome : nome.value,
      imagem : imagem.value,
      genero : genero.value,
      nota : nota.value
  }
  
  if(!edicao) {
      const request = new Request(`${urlApi}/add`, {
          method: 'POST',
          body: JSON.stringify(filme),
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      })

      const response = await fetch(request);
      const result = await response.json();

      if(result) {
          edicao = false;
          getFilmes();
      }

  } else {
      const request = new Request(`${urlApi}/${idEdicao}`, {
          method: 'PUT',
          body: JSON.stringify(filme),
          headers: new Headers({
              'Content-Type': 'application/json'
          })
      })

      const response = await fetch(request);
      const result = await response.json();

      if(result){
          edicao = false;
          getFilmes();
      }
  }


  nome.value = '';
  imagem.value = '';
  genero.value = '';
  nota.value = '';

  lista.innerHTML = '';

}

const getFilmeById = async (id) => {
  const response = await fetch(`${urlApi}/${id}`);
  return filme = response.json();
}


const putFilme = async (id) =>{
  edicao = true;
  idEdicao = id;

  const filme = await getFilmeById(id);

  let nomeDoElemento = document.getElementById('nome');
  let imagemDoElemento = document.getElementById('imagem');
  let generoDoElemento = document.getElementById('genero');
  let notaDoElemento = document.getElementById('nota');

  nomeDoElemento.value = filme.nome;
  imagemDoElemento.value = filme.imagem;
  generoDoElemento.value = filme.genero;
  notaDoElemento.value = filme.nota;


  edicao = false;
}

const deleteFilme = async (id) => {
  const request = new Request(`${urlApi}/${id}`,{
    method: 'DELETE',
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message);

  lista.innerHTML = '';
  getFilmes();
}
