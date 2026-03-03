const fs = require("fs");
const axios = require("axios");

// 🔹 Lê o arquivo lista.txt
let conteudo;

try {
    conteudo = fs.readFileSync("lista.txt", "utf-8");
    console.log("Arquivo lido com sucesso!");

} 
catch (erro) 
{
    console.error("Erro ao ler o arquivo:", erro.message);
    process.exit(1);
}

// 🔹 Monta o payload JSON
const payload = {
    dados: conteudo
};

// 🔹 URL da Máquina B
const url = "http://localhost:3000/dados";

// 🔹 Envia POST
axios.post(url, payload)
    .then(resposta => {
        console.log("Resposta recebida da Máquina B:");
        console.log(resposta.data);
    })
    .catch(erro => {
        console.error("Erro ao enviar requisição:", erro.message);
    });