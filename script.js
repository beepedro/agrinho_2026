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

// Avaliação do Solo com causas e várias soluções
document.getElementById("form-solo").addEventListener("submit", function(e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao-solo").value.toLowerCase();
  let resultado = "";

  if (descricao.includes("seco") || descricao.includes("seca")) {
    resultado = `
      <p><strong>⚠️ Possível causa:</strong> Falta de irrigação ou baixa retenção de água.</p>
      <p><strong>✅ O que pode ser feito:</strong></p>
      <ul>
        <li>Implementar irrigação por gotejamento.</li>
        <li>Adicionar matéria orgânica para melhorar retenção.</li>
        <li>Usar cobertura vegetal (palhada) para reduzir evaporação.</li>
        <li>Captação de água da chuva para irrigação.</li>
      </ul>
    `;
  } else if (descricao.includes("fertilidade") || descricao.includes("fraco")) {
    resultado = `
      <p><strong>⚠️ Possível causa:</strong> Deficiência de nutrientes ou uso contínuo sem rotação.</p>
      <p><strong>✅ O que pode ser feito:</strong></p>
      <ul>
        <li>Aplicar adubação orgânica ou compostagem.</li>
        <li>Fazer rotação de culturas para diversificar nutrientes.</li>
        <li>Usar adubos verdes (plantas que enriquecem o solo).</li>
        <li>Evitar uso excessivo de químicos que empobrecem o solo.</li>
      </ul>
    `;
  } else if (descricao.includes("compactado") || descricao.includes("duro")) {
    resultado = `
      <p><strong>⚠️ Possível causa:</strong> Compactação por máquinas ou pisoteio.</p>
      <p><strong>✅ O que pode ser feito:</strong></p>
      <ul>
        <li>Realizar descompactação mecânica (subsolagem).</li>
        <li>Plantar espécies de raízes profundas para quebrar o solo.</li>
        <li>Evitar tráfego excessivo de máquinas pesadas.</li>
        <li>Adicionar matéria orgânica para melhorar estrutura.</li>
      </ul>
    `;
  } else {
    resultado = `
      <p><strong>⚠️ Possível causa:</strong> Não identificada claramente.</p>
      <p><strong>✅ O que pode ser feito:</strong></p>
      <ul>
        <li>Realizar análise química do solo.</li>
        <li>Consultar um agrônomo para diagnóstico detalhado.</li>
        <li>Observar histórico de uso da área.</li>
      </ul>
    `;
  }

  resultado += `<p><em>Essas são apenas possíveis causas e soluções. Para certeza, é necessário acompanhamento técnico.</em></p>`;
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
