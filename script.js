// Guarda o progresso que queremos chegar
var progressoAlvo = 0;

// Guarda o progresso que aparece na tela no momento
var progressoAtual = 0;

// Define o quanto o scroll do mouse influencia no progresso
var sensibilidade = 0.00012;

// Define o quão suave será a animação
var suavidade = 0.05;

// Pega todas as imagens da sequência
var fotos = document.querySelectorAll(".foto-sequencia");

// Pega o elemento do livro
var livro = document.getElementById("livro");

// Pega o cabeçalho da página
var cabecalho = document.getElementById("cabecalho");

// Pega o formulário de presença
var formPresenca = document.getElementById("form-presenca");

// Pega a mensagem que aparece depois de marcar presença
var mensagemPresenca = document.getElementById("mensagem-presenca");

// Pega o botão de fechar o livro
var fecharLivro = document.getElementById("fechar-livro");


// Quando o usuário usa o scroll do mouse
window.addEventListener("wheel", function(event) {
  // Impede o scroll normal da página
  event.preventDefault();

  // Aumenta ou diminui o progresso conforme o scroll
  progressoAlvo = progressoAlvo + event.deltaY * sensibilidade;

  // Limita o progresso entre 0 e 1
  progressoAlvo = limitar(progressoAlvo, 0, 1);

}, { passive: false });


// Função que faz a animação acontecer continuamente
function animar() {
  // Faz o progresso atual ir se aproximando do progresso alvo de forma suave
  progressoAtual = progressoAtual + (progressoAlvo - progressoAtual) * suavidade;

  // Atualiza o que aparece na tela
  atualizarTela(progressoAtual);

  // Chama a animação de novo
  requestAnimationFrame(animar);
}


// Atualiza os elementos da tela conforme o progresso
function atualizarTela(progresso) {
  // Define o progresso usado apenas para trocar as imagens
  var progressoImagens = limitar(progresso / 0.88, 0, 1);

  // Mostra a imagem correta da sequência
  mostrarImagem(progressoImagens);

  // Faz o cabeçalho desaparecer aos poucos
  cabecalho.style.opacity = 1 - faixa(progresso, 0.03, 0.18);

  // Faz o livro aparecer no final da sequência
  var apareceLivro = faixa(progresso, 0.88, 1);

  // Controla a transparência do livro
  livro.style.opacity = apareceLivro;

  // Se o livro já apareceu quase todo, permite clicar nele
  if (apareceLivro > 0.8) {
    livro.style.pointerEvents = "auto";
  } else {
    // Se ainda não apareceu, não permite clicar
    livro.style.pointerEvents = "none";

    // Fecha o livro caso ele esteja aberto
    livro.classList.remove("aberto");

    // Limpa a mensagem de presença
    mensagemPresenca.innerText = "";
  }
}


// Mostra a imagem correta conforme o progresso
function mostrarImagem(progressoImagens) {
  // Guarda o total de fotos
  var totalFotos = fotos.length;

  // Calcula a posição atual dentro da sequência de fotos
  var posicao = progressoImagens * (totalFotos - 1);

  // Descobre qual é a foto atual
  var fotoAtual = Math.floor(posicao);

  // Calcula a transição entre uma foto e a próxima
  var transicao = posicao - fotoAtual;

  // Primeiro deixa todas as fotos invisíveis
  for (var i = 0; i < totalFotos; i++) {
    fotos[i].style.opacity = 0;
  }

  // Mostra a foto atual
  fotos[fotoAtual].style.opacity = 1 - transicao;

  // Se existir uma próxima foto, ela aparece aos poucos
  if (fotoAtual + 1 < totalFotos) {
    fotos[fotoAtual + 1].style.opacity = transicao;
  }
}


// Quando o usuário clica no livro
livro.addEventListener("click", function() {
  // Só abre o livro se o progresso estiver quase no final
  if (progressoAtual > 0.95) {
    livro.classList.add("aberto");
  }
});


// Impede que o clique no formulário feche ou afete o livro
formPresenca.addEventListener("click", function(event) {
  event.stopPropagation();
});


// Quando o formulário é enviado
formPresenca.addEventListener("submit", function(event) {
  // Impede o envio normal do formulário
  event.preventDefault();

  // Impede que o clique afete o livro
  event.stopPropagation();

  // Mostra a mensagem de confirmação
  mensagemPresenca.innerText = "Presença marcada com sucesso!";
});


// Função para limitar um valor entre um mínimo e um máximo
function limitar(valor, minimo, maximo) {
  // Se o valor for menor que o mínimo, retorna o mínimo
  if (valor < minimo) {
    return minimo;
  }

  // Se o valor for maior que o máximo, retorna o máximo
  if (valor > maximo) {
    return maximo;
  }

  // Se estiver dentro do limite, retorna o próprio valor
  return valor;
}


// Função que cria uma transição mais suave entre dois pontos
function faixa(valor, inicio, fim) {
  // Calcula o quanto o valor avançou entre o início e o fim
  var resultado = (valor - inicio) / (fim - inicio);

  // Limita o resultado entre 0 e 1
  resultado = limitar(resultado, 0, 1);

  // Suaviza a transição
  return resultado * resultado * (3 - 2 * resultado);
}


// Quando o usuário clica no botão de fechar o livro
fecharLivro.addEventListener("click", function(event) {
  // Impede que o clique também ative o clique do livro
  event.stopPropagation();

  // Fecha o livro
  livro.classList.remove("aberto");

  // Limpa a mensagem de presença
  mensagemPresenca.innerText = "";
});


// Inicia a animação
animar();