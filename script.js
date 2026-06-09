// Função da calculadora
document.getElementById("form-calculadora").addEventListener("submit", function(e) {
    e.preventDefault();
    const hectares = parseFloat(document.getElementById("hectares").value);
    const plantacao = document.getElementById("plantacao").value;
    let consumo = 0;

    if (plantacao === "milho") consumo = hectares * 5000;
    if (plantacao === "soja") consumo = hectares * 4000;
    if (plantacao === "cana") consumo = hectares * 6000;

    let mensagem = consumo <= 20000 
        ? "✅ Seu consumo está dentro da média sustentável."
        : "⚠️ Atenção: seu consumo está acima do recomendado.";

    document.getElementById("resultado").innerHTML =
        `<p>Consumo recomendado: <strong>${consumo} litros por semana</strong>.</p><p>${mensagem}</p>`;
});

// Botão de acessibilidade
const btn = document.getElementById("btn-acessibilidade");
let fonte = 16;
let contraste = false;

btn.addEventListener("click", function() {
    if (!contraste) {
        document.body.classList.toggle("alto-contraste");
        contraste = true;
    } else {
        fonte += 2;
        document.body.style.fontSize = fonte + "px";
    }
});
