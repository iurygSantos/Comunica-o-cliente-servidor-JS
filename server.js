// Importa o framework Express para criar o servidor HTTP
const express = require("express");
const fs = require("fs");

// Cria uma instância da aplicação Express
const app = express();

// Define a porta que o servidor irá escutar
const PORT = 3000;

// Middleware que permite ao servidor entender requisições com corpo JSON
// Sem isso o servidor não conseguiria ler req.body
app.use(express.json());


// ============================================================
// FUNÇÃO DE SANITIZAÇÃO DOS DADOS
// ============================================================

function sanitizarTexto(texto) {

    
    // Remove espaços no início e no final
    let resultado = texto.trim();
    
    // console.log(resultado);

    // Substitui múltiplos espaços por apenas um
    // let resultado = texto.replace(/\s+/g, " ");

    // Remove caracteres especiais perigosos
    // Mantém apenas letras, números, espaço e pontuação básica
    resultado = resultado.replace(/[^\w\s.,!?-]/g, "");

    return resultado;
}



// ============================================================
// FUNÇÃO DE PROCESSAMENTO DOS DADOS
// ============================================================

function processarDados(textoOriginal) 
{
    // Aplica sanitização
    const textoSanitizado = sanitizarTexto(textoOriginal);

    // Conta caracteres totais
    const totalCaracteres = textoSanitizado.length;

    // Conta palavras separando por espaço
    // const palavras = textoSanitizado.split(" ").filter(p => p.length > 0);
    // const totalPalavras = palavras.length;

    // Conta linhas
    const linhas = textoSanitizado.split("\n");
    const totalLinhas = linhas.length;

    // Conversões de exemplo
    const textoMaiusculo = textoSanitizado.toUpperCase();
    const textoMinusculo = textoSanitizado.toLowerCase();

    // Retorna um relatório estruturado
    return {
        resumo: {
            caracteres: totalCaracteres,
            // palavras: totalPalavras,
            linhas: totalLinhas
        },
        conversoes: {
            maiusculo: textoMaiusculo,
            minusculo: textoMinusculo
        },
        preview: textoSanitizado.substring(0, 100) // primeiros 100 caracteres
    };
}


// ============================================================
// ENDPOINT POST
// ============================================================

app.post("/dados", (req, res) => {

    // Verifica se o campo dados existe no JSON recebido
    if (!req.body.dados) {
        return res.status(400).json({
            erro: "Campo 'dados' não enviado no JSON"
        });
    }
    else {
        console.log("Arquivo recebido com sucesso!\n");

        // Extrai o texto recebido
        const dadosRecebidos = req.body.dados;

         // 🔹 SALVAR ARQUIVO RECEBIDO
        try 
        {
            fs.writeFileSync("lista_recebida.txt", dadosRecebidos);
        
            console.log("📁 Arquivo lista_recebida.txt salvo com sucesso!");
        } 
        catch (erro) 
        {
            return res.status(500).json({
                status: "erro",
                mensagem: "Falha ao salvar arquivo no servidor"
            });
        }


        // Processa os dados
        const relatorio = processarDados(dadosRecebidos);
        
        // Retorna relatório para a Máquina A
        res.json({
            status: "Processamento concluído",
            relatorio: relatorio
        });
    }

});



// ============================================================
// INICIA O SERVIDOR
// ============================================================

app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});