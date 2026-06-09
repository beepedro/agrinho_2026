// Calculadora com barra de progresso
document.getElementById("form-calculadora").addEventListener("submit", function(e) {
    e.preventDefault();
    const hectares = parseFloat(document.getElementById("hectares").value);
    const plantacao = document.getElementById("plantacao").value;
    let consumo = 0;

    if (plantacao === "milho") consumo = hectares * 5000;
    if (plantacao === "soja") consumo = hectares * 4000;
    if (plantacao === "cana") consumo = hectares * 6000;

    let limite = 20000;
    let porcentagem = Math.min((consumo / limite) * 100, 100);

    document.getElementById("resultado").innerHTML =
        `<p>Consumo recomendado: <strong>${consumo} litros/semana</strong>.</p>`;

    document.getElementById("progresso").style.width = porcentagem + "%";
    document.getElementById("progresso").style.background = consumo <= limite ? "#00b894" : "#d63031";
});

// Dicas sustentáveis
const dicas = [
    "Use irrigação por gotejamento para economizar água.",
    "Faça rotação de culturas para melhorar o solo.",
    "Capte água da chuva para irrigação.",
    "Prefira adubação orgânica para enriquecer a terra."
];

document.getElementById("btn-dica
