// === Calculadora de Consumo de Água ===
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
        `<p>Consumo recomendado para <strong>${plantacao}</strong>: <strong>${consumo} litros/semana</strong>.</p>`;

    document.getElementById("progresso").style.width = porcentagem + "%";
    document.getElementById("progresso").style.background = consumo <= limite ? "#2e7d32" : "#d32f2f";
});

// === Avaliação do Solo com causas e soluções ===
document.getElementById("form-solo").addEventListener("submit", function(e) {
    e.preventDefault();
    const descricao = document.getElementById("descricao-solo").value.toLowerCase();
    let resultado = "";

    if (descricao.includes("seco") || descricao.includes("seca")) {
        resultado = `
            <p><strong>Possível causa:</strong> Falta de irrigação ou baixa retenção de água.</p>
            <p><strong>O que pode ser feito:</strong> Irrigação por gotejamento e adição de matéria orgânica.</p>
        `;
    } else if (descricao.includes("fertilidade") || descricao.includes("fraco")) {
        resultado = `
            <p><strong>Possível causa:</strong> Deficiência de nutrientes ou uso contínuo sem rotação.</p>
            <p><strong>O que pode ser feito:</strong> Adubação orgânica, rotação de culturas e compostagem.</p>
        `;
    } else if (descricao.includes("compactado") || descricao.includes("duro")) {
        resultado = `
            <p><strong>Possível causa:</strong> Compactação por máquinas ou pisoteio.</p>
            <p><strong>O que pode ser feito:</strong> Descompactação mecânica e cultivo de raízes profundas.</p>
        `;
    } else {
        resultado = `
            <p><strong>Possível causa:</strong> Não identificada claramente.</p>
            <p><strong>O que pode ser feito:</strong> Consultar um agrônomo para análise detalhada.</p>
        `;
    }

    resultado += `<p><em>Essas são apenas possíveis causas e soluções. Para certeza, é necessário acompanhamento técnico.</em></p>`;
    document.getElementById("resultado-solo").innerHTML = resultado;
});

// === Dicas Sustentáveis ===
const dicas = [
    "Use irrigação por gotejamento para economizar água.",
    "Faça rotação de culturas para melhorar o solo.",
    "Capte água da chuva para irrigação.",
    "Prefira adubação orgânica para enriquecer a terra.",
    "Evite desperdício monitorando o consumo semanal."
];

document.getElementById("btn-dica").addEventListener("click", function() {
    const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
    document.getElementById("dica").innerText = dicaAleatoria;
});

// === Avaliação por Estrelas ===
const estrelas = document.querySelectorAll(".estrela");
const resultadoAvaliacao = document.getElementById("resultado-avaliacao");

estrelas.forEach(estrela => {
    estrela.addEventListener("click", function() {
        const valor = parseInt(this.getAttribute("data-valor"));
        estrelas.forEach(e => e.classList.remove("selecionada"));
        for (let i =
