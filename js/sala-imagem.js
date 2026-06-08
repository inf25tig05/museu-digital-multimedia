fetch("./xml/sala-imagem.xml")
  .then(function(resposta) {
    return resposta.text();
  })
  .then(function(textoXML) {
    var parser = new DOMParser();
    var xml = parser.parseFromString(textoXML, "text/xml");

    var obras = xml.getElementsByTagName("obra");

    for (var i = 0; i < obras.length; i++) {
      var obra = obras[i];

      var posicao = obra.getAttribute("posicao");

      var titulo = obra.getElementsByTagName("titulo")[0].textContent;
      var autor = obra.getElementsByTagName("autor")[0].textContent;
      var nascimento = obra.getElementsByTagName("ano_nascimento_autor")[0].textContent;
      var morte = obra.getElementsByTagName("ano_morte_autor")[0].textContent;
      var imagem = obra.getElementsByTagName("imagem")[0].textContent;
      var descricao = obra.getElementsByTagName("descricao")[0].textContent;

      var quadro = document.querySelector('[data-id="' + posicao + '"]');

      if (quadro) {
        quadro.querySelector("img").src = imagem;
        quadro.querySelector("img").alt = titulo;

        quadro.querySelector(".titulo-obra").textContent = titulo;
        quadro.querySelector(".autor-obra").textContent = autor;
        quadro.querySelector(".vida-autor").textContent = nascimento + " - " + morte;
        quadro.querySelector(".descricao-obra").textContent = descricao;
      }
    }
  });
