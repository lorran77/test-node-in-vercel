window.onload = () => ObterPosts();

function PostTemplate(titulo, corpo, imagem, id)
{
  return `<article class="blog-post-container" data-post-id="${id}">
        <div class="row">
          <div class="blog-post-image col-3">
            <img src=${imagem} || "https://bit.ly/2So2zvB"  alt="Erro"></img>
          </div>
          <div class="col-7">
            <div class="blog-post-title">${titulo}</div>
            <div class="blog-post-body">${corpo}</div>
          </div>
          <div class="col-2 d-flex align-items-center">
            <a style="color:white" class="btn btn-danger m-auto" onclick="DeletarPost(this)">X</a>
          </div>
        </div>
      </article>`;
}

function ObterPosts() {

  fetch("https://api-blog-confeitaria.vercel.app/posts", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((resposta) => resposta.json())
    .then((resposta) => {

      // console.log(resposta);

      const secaoblog = document.querySelector("section.blog-container"); // Seleciona o elemento do DOM

      // axios.get("http://localhost:3000/posts").then(resposta => {
      let ListaDePosts = resposta.map(post =>
        PostTemplate(post.title, post.body, post.image, post.id)
      ); // Faz uma Array com os posts no formato do template
      console.log(ListaDePosts);

      let PostsJuntos = ListaDePosts.reverse().join(); // Junta todos os posts em uma string só
      if (ListaDePosts.length == 0) {
        PostsJuntos = `<div class="alert alert-info" role="alert">
      Nenhum post! Crie um novo!
    </div>`;}
        secaoblog.innerHTML = PostsJuntos;
      // Insere a string dentro da seção dos posts
    });
}

const formulario = document.querySelector("form");

formulario.addEventListener("submit", event => {
  event.preventDefault(); //Previne a atualização da pagina após enviar o formulário
  const dadosDoFormulario = {
    title: formulario.children.title.value,
    body: formulario.children.body.value,
    image: formulario.children.image.value
  }; // Pega os dados do formulário
  EnviarPost(dadosDoFormulario); // Chama a função que vai realizar a requisição
});





function EnviarPost() {
  // fetch
  //   .post("https://api-blog-confeitaria.vercel.app/posts", dadosDoFormulario)
  //   .then(() => ObterPosts())
  //   .catch(e => console.log(e));

  const tituloPost = (document.querySelector("id").value);
  const corpoPost = document.querySelector("#nome").value;
  const imagemPost = parseInt(document.querySelector("#preco").value);

  //PASSO 2: criando um objeto produto
  let postInserido = {
    titulo: tituloPost,
    corpo: corpoPost,
    imagem: imagemPost,
  };   

  //passo 4: inserindo o objeto PRODUTO na API
  fetch(`https://api-blog-confeitaria.vercel.app/posts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(postInserido),
  }).then((response) => {
    limpaTabela();
    getprodutos();

    //mensagem de alteração salva e escondo a div
    div = document.getElementById("div-cadastrar");
    div.classList.remove("div-cadastrar-ativo");
    div.classList.add("div-cadastrar-inativo");
    alert("PRODUTO CADASTRADO COM SUCESSO");
  // });
});
}


function DeletarPost(elemento) {
  const post = elemento.parentNode.parentNode.parentNode;
  const id = post.dataset.postId;
  fetch.delete(`http://localhost:3000/posts/${id}`).then(() => ObterPosts());
}
