// Calculadora
document.getElementById("form-calculadora").addEventListener("submit", function(e) {
  e.preventDefault();
  const hectares = parseFloat(document.getElementById("hectares").value);
  const plantacao = document.getElementById("plantacao").value.toLowerCase();
  let consumo = 0;
  if (plantacao.includes("milho")) consumo = hectares * 5000;
  else if (plantacao.includes("soja")) consumo = hectares * 4000;
  else if (plantacao.includes("cana")) consumo = hectares * 6000;
  else consumo = hectares * 4500;
  let limite = 20000;
  let porcentagem = Math.min((consumo / limite) * 100, 100);
  document.getElementById("resultado").innerHTML =
    `<p>Consumo recomendado: <strong>${consumo} litros/semana</strong></p>`;
  document.getElementById("progresso").style.width = porcentagem + "%";
});

// Avaliação do Solo
document.getElementById("form-solo").addEventListener("submit", function(e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao-solo").value.toLowerCase();
  let resultado = "";
  if (descricao.includes("seco")) {
    resultado = "⚠️ Possível causa: falta de irrigação. ✅ Sugestão: irrigação por gotejamento.";
  } else if (descricao.includes("fertilidade")) {
    resultado = "⚠️ Possível causa: deficiência de nutrientes. ✅ Sugestão: adubação orgânica.";
  } else if (descricao.includes("compactado")) {
    resultado = "⚠️ Possível causa: solo compactado. ✅ Sugestão: descompactação mecânica.";
  } else {
    resultado = "⚠️ Possível causa não identificada. ✅ Sugestão: consultar agrônomo.";
  }
  resultado += "<br><em>Essas são apenas hipóteses, consulte um técnico para certeza.</em>";
  document.getElementById("resultado-solo").innerHTML = resultado;
});

// Dicas
const dicas = [
  "Use irrigação por gotejamento.",
  "Faça rotação de culturas.",
  "Capte água da chuva.",
  "Prefira adubação orgânica.",
  "Monitore o consumo semanal."
];
document.getElementById("btn-dica").addEventListener("click", function() {
  const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
  document.getElementById("dica").innerText = dicaAleatoria;
});

// Estrelas
const estrelas = document.querySelectorAll(".estrela");
const resultadoAvaliacao = document.getElementById("resultado-avaliacao");
estrelas.forEach(estrela => {
  estrela.addEventListener("click", function() {
    const valor = parseInt(this.getAttribute("data-valor"));
    estrelas.forEach(e => e.classList.remove("selecionada"));
    for (let i = 0; i < valor; i++) estrelas[i].classList.add("selecionada");
    resultadoAvaliacao.innerText = `Você avaliou com ${valor} estrela(s). Obrigado!`;
  });
});

// Acessibilidade
let tamanhoFonte = 16;
function aumentarFonte() { tamanhoFonte += 2; document.body.style.fontSize = tamanhoFonte + "px"; }
function diminuirFonte() { if (tamanhoFonte > 10) { tamanhoFonte -= 2; document.body.style.fontSize = tamanhoFonte + "px"; } }
function toggleContraste() { document.body.classList.toggle("alto-contraste"); }
