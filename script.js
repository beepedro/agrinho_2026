// ==================== //
// FUNCIONALIDADES JS   //
// ==================== //

// 1. Acessibilidade: aumentar/diminuir fonte e alto contraste
let tamanhoFonteAtual = 100; // em %

function aplicarTamanhoFonte() {
    document.body.style.fontSize = tamanhoFonteAtual + "%";
}

// Botão aumentar fonte
document.getElementById("aumentarFonte").addEventListener("click", function() {
    if (tamanhoFonteAtual < 150) {
        tamanhoFonteAtual += 10;
        aplicarTamanhoFonte();
    }
});

// Botão diminuir fonte
document.getElementById("diminuirFonte").addEventListener("click", function() {
    if (tamanhoFonteAtual > 70) {
        tamanhoFonteAtual -= 10;
        aplicarTamanhoFonte();
    }
});

// Botão alto contraste
let contrasteAtivo = false;
document.getElementById("altoContraste").addEventListener("click", function() {
    if (!contrasteAtivo) {
        document.body.classList.add("alto-contraste");
        contrasteAtivo = true;
    } else {
        document.body.classList.remove("alto-contraste");
        contrasteAtivo = false;
    }
});

// ==================== //
// 2. CALCULADORA DE ÁGUA
// ==================== //

function calcularAguaRecomendada(hectares, tipoIrrigacao) {
    // Base: uma lavoura média precisa de aproximadamente 50.000 litros por hectare por dia (valor didático)
    let litrosPorHectare = 50000;
    
    // Ajuste por tipo de irrigação (economia ou desperdício)
    if (tipoIrrigacao === "gotejamento") {
        litrosPorHectare = litrosPorHectare * 0.6; // economia de 40%
    } else if (tipoIrrigacao === "aspersao") {
        litrosPorHectare = litrosPorHectare * 0.85; // economia de 15%
    } else if (tipoIrrigacao === "sulco") {
        litrosPorHectare = litrosPorHectare * 1.2; // desperdício maior
    }
    
    let totalLitros = hectares * litrosPorHectare;
    return Math.round(totalLitros);
}

// Evento do botão calcular
document.getElementById("calcularAgua").addEventListener("click", function() {
    let hectares = parseFloat(document.getElementById("hectares").value);
    let tipoPlantacao = document.getElementById("tipoPlantacao").value.trim();
    let tipoIrrigacao = document.getElementById("tipoIrrigacao").value;
    
    // Validação
    if (isNaN(hectares) || hectares <= 0) {
        document.getElementById("resultadoAgua").innerHTML = "<strong>❌ Erro:</strong> Informe uma quantidade válida de hectares (número maior que zero).";
        return;
    }
    
    if (tipoPlantacao === "") {
        document.getElementById("resultadoAgua").innerHTML = "<strong>❌ Erro:</strong> Digite qual é o tipo da sua plantação.";
        return;
    }
    
    let litrosRecomendados = calcularAguaRecomendada(hectares, tipoIrrigacao);
    
    // Texto do tipo de irrigação para exibir
    let nomeIrrigacao = "";
    if (tipoIrrigacao === "gotejamento") nomeIrrigacao = "Gotejamento (econômico)";
    else if (tipoIrrigacao === "aspersao") nomeIrrigacao = "Aspersão (médio)";
    else nomeIrrigacao = "Sulco / Inundação (alto consumo)";
    
    let resultadoHTML = `
        <strong>💧 RESULTADO:</strong><br>
        🌾 Plantação: ${tipoPlantacao}<br>
        📏 Área: ${hectares} hectare(s)<br>
        🚿 Irrigação: ${nomeIrrigacao}<br>
        💦 Água recomendada por dia: <strong>${litrosRecomendados.toLocaleString()} litros</strong><br>
        🌱 Dica: Utilize irrigação por gotejamento para economizar até 40% de água!
    `;
    
    document.getElementById("resultadoAgua").innerHTML = resultadoHTML;
});

// Limpar calculadora
document.getElementById("limparCalculadora").addEventListener("click", function() {
    document.getElementById("hectares").value = "";
    document.getElementById("tipoPlantacao").value = "";
    document.getElementById("tipoIrrigacao").value = "gotejamento";
    document.getElementById("resultadoAgua").innerHTML = "";
});

// ==================== //
// 3. ANÁLISE DO SOLO (simulada por descrição)
// ==================== //

// Pré-visualizar imagem enviada
document.getElementById("fotoSolo").addEventListener("change", function(event) {
    const previewDiv = document.getElementById("previewImagem");
    previewDiv.innerHTML = ""; // limpa preview anterior
    
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.maxWidth = "100%";
            img.style.maxHeight = "200px";
            img.style.borderRadius = "12px";
            img.style.marginTop = "10px";
            previewDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Função para gerar dicas com base na descrição do solo
function analisarSolo(descricao) {
    descricao = descricao.toLowerCase();
    
    if (descricao.includes("seco") || descricao.includes("ressecado") || descricao.includes("crostone")) {
        return "🌱 Dica: Seu solo parece estar seco. Aplique cobertura morta (palha) para reter umidade. Irrigue no início da manhã ou fim da tarde para evitar evaporação.";
    }
    else if (descricao.includes("encharcado") || descricao.includes("alagado") || descricao.includes("água em pé")) {
        return "💧 Dica: Solo com excesso de água. Melhore a drenagem com sulcos ou canais. Evite irrigar até a terra secar um pouco. Plante em canteiros elevados.";
    }
    else if (descricao.includes("rachadura") || descricao.includes("rachado") || descricao.includes("fissura")) {
        return "⚠️ Dica: Rachaduras indicam solo compactado. Incorpore matéria orgânica (composto, esterco) para melhorar a estrutura. Faça aração superficial.";
    }
    else if (descricao.includes("pouco fertil") || descricao.includes("pobre") || descricao.includes("sem nutriente")) {
        return "🌿 Dica: Solo com baixa fertilidade. Adicione adubo orgânico, farinha de osso ou torta de mamona. Faça rotação de culturas com leguminosas (feijão, soja).";
    }
    else if (descricao.includes("argiloso") || descricao.includes("muito duro")) {
        return "🪨 Dica: Solo argiloso retém água mas pode ficar muito duro. Misture areia e matéria orgânica. Plante espécies com raízes profundas.";
    }
    else if (descricao.includes("arenoso") || descricao.includes("areia")) {
        return "🏜️ Dica: Solo arenoso drena rápido. Adicione composto orgânico e cobertura morta. Irrigue com mais frequência e em menor quantidade.";
    }
    else {
        return "✅ Dica geral: Faça análise de solo a cada 2 anos. Mantenha matéria orgânica, evite queimadas e plante sempre respeitando o período de descanso da terra.";
    }
}

// Evento do botão analisar solo
document.getElementById("analisarSolo").addEventListener("click", function() {
    let descricao = document.getElementById("descricaoSolo").value.trim();
    let foto = document.getElementById("fotoSolo").files[0];
    
    if (descricao === "") {
        document.getElementById("resultadoSolo").innerHTML = "<strong>❌ Erro:</strong> Descreva o problema do seu solo para receber as dicas.";
        return;
    }
    
    if (!foto) {
        document.getElementById("resultadoSolo").innerHTML = "<strong>⚠️ Atenção:</strong> Você não enviou uma foto, mas mesmo assim analisamos pela descrição.";
    } else {
        document.getElementById("resultadoSolo").innerHTML = "<strong>📸 Foto recebida!</strong> Analisando...<br><br>";
    }
    
    const dica = analisarSolo(descricao);
    
    let resultadoFinal = `
        <strong>🔍 RESULTADO DA ANÁLISE DO SOLO:</strong><br>
        📝 Problema descrito: "${descricao}"<br>
        🌟 ${dica}<br><br>
        <small>💡 Lembre-se: essa é uma simulação baseada na sua descrição. Para um laço preciso, procure um engenheiro agrônomo.</small>
    `;
    
    // Se já existia conteúdo antes, adiciona
    if (document.getElementById("resultadoSolo").innerHTML.includes("Foto recebida")) {
        document.getElementById("resultadoSolo").innerHTML += resultadoFinal;
    } else {
        document.getElementById("resultadoSolo").innerHTML = resultadoFinal;
    }
});

// Limpar formulário do solo
document.getElementById("limparSolo").addEventListener("click", function() {
    document.getElementById("fotoSolo").value = "";
    document.getElementById("descricaoSolo").value = "";
    document.getElementById("resultadoSolo").innerHTML = "";
    document.getElementById("previewImagem").innerHTML = "";
});
