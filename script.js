// Calculadora com barra de progresso
document.getElementById("form-calculadora").addEventListener("submit", function(e) {
    e.preventDefault(); // impede atualização da página
    const hectares = parseFloat(document.getElementById("hectares").value);
    const plantacao = document.getElementById("plantacao").value.toLowerCase();
    let consumo = 0;

    if (plantacao.includes("milho")) consumo = hectares * 5000;
    else if (plantacao.includes("soja")) consumo = hectares * 4000;
    else if (plantacao.includes("cana")) consumo = hectares * 6000;
    else consumo = hectares * 4500; // valor padrão

    let limite = 20000;
    let porcentagem = Math.min((consumo / limite) * 100, 100);

    document.getElementById("resultado").innerHTML =
        `<p>Consumo recomendado para <strong>${plantacao}</strong>: <strong>${consumo} litros/semana</strong>.</p>`;

    document.getElementById("progresso").style.width = porcentagem + "%";
    document.getElementById("progresso").style.background = consumo <= limite ? "#2e7d32" : "#d32f2f";
});

// Dicas sustentáveis
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

// Acessibilidade
let tamanhoFonte = 16;
function aumentarFonte() {
    tamanhoFonte += 2;
    document.body.style.fontSize = tamanhoFonte + "px";
}
function diminuirFonte() {
    if (tamanhoFonte > 10) {
        tamanhoFonte -= 2;
        document.body.style.fontSize = tamanhoFonte + "px";
    }
}
function toggleContraste() {
    document.body.classList.toggle("alto-contraste");
}

// Impedir atualização no formulário de avaliação
document.querySelector("#avaliacao form").addEventListener("submit", function(e) {
    e.preventDefault(); // impede atualização da página
    // Avaliação do solo
document.getElementById("form-solo").addEventListener("submit", function(e) {
    e.preventDefault();
    const foto = document.getElementById("foto-solo").files[0];
    const descricao = document.getElementById("descricao-solo").value;
    if (foto && descricao) {
        alert("Sua avaliação foi registrada com sucesso!");
    } else {
        alert("Por favor, envie uma foto e descreva o problema.");
    }
});

// Avaliação por estrelas
const estrelas = document.querySelectorAll(".estrela");
const resultadoAvaliacao = document.getElementById("resultado-avaliacao");

estrelas.forEach(estrela => {
    estrela.addEventListener("click", function() {
        const valor = parseInt(this.getAttribute("data-valor"));

        // Resetar todas
        estrelas.forEach(e => e.classList.remove("selecionada"));

        // Selecionar até a estrela clicada
        for (let i = 0; i < valor; i++) {
            estrelas[i].classList.add("selecionada");
        }

        resultadoAvaliacao.innerText = `Você avaliou o site com ${valor} estrela(s). Obrigado pelo feedback!`;
    });
});
