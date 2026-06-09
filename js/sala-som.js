var discos = document.querySelectorAll(".disco");
var botaoParar = document.getElementById("parar-musica");

var audioAtual = null;
var discoAtual = null;

discos.forEach(function(disco) {
  disco.addEventListener("click", function() {
    var caminhoAudio = disco.getAttribute("data-audio");

    if (audioAtual != null) {
      audioAtual.pause();
      audioAtual.currentTime = 0;
    }

    if (discoAtual != null) {
      discoAtual.classList.remove("tocando");
    }

    audioAtual = new Audio(caminhoAudio);
    audioAtual.play();

    disco.classList.add("tocando");
    discoAtual = disco;
  });
});

botaoParar.addEventListener("click", function() {
  if (audioAtual != null) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
  }

  if (discoAtual != null) {
    discoAtual.classList.remove("tocando");
  }

  audioAtual = null;
  discoAtual = null;
});
