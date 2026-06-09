// Calculadora de Consumo de Água
document.getElementById("form-calculadora").addEventListener("submit", function(e) {
    e.preventDefault();
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
    document.getElementById("progresso").style.background = consumo <= limite ? "#2e7d32"
