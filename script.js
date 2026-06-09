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
        resultado = `<p><strong>⚠️ Possível causa:</strong> Falta de irrigação ou baixa retenção de água.</p>
                     <p><strong>✅ O que pode ser feito:</strong> Irrigação por gotejamento e adição de matéria orgânica.</p>`;
    } else if (descricao.includes("fertilidade") || descricao.includes("fraco")) {
        resultado = `<p><strong>⚠️ Possível causa:</strong> Deficiência de nutrientes ou uso contínuo sem rotação.</p>
                     <p><strong>✅ O que pode ser feito:</strong> Adubação orgânica, rotação de culturas e compostagem.</p>`;
    } else if (descricao.includes("compactado") ||
