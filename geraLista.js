const fs = require('fs');

const totalLinhas = 1000;
const prefixos = ['User', 'Data', 'Sensor', 'Node', 'System', 'Admin'];
const sufixos = ['_Alpha', '_Beta', '_Gamma', '_Delta', '_Omega', '_Final'];

let conteudo = "";

for (let i = 1; i <= totalLinhas; i++) {
    const pre = prefixos[Math.floor(Math.random() * prefixos.length)];
    const suf = sufixos[Math.floor(Math.random() * sufixos.length)];
    const id = Math.floor(Math.random() * 9999);
    
    conteudo += `${pre}${suf}_${id}\n`;
}

fs.writeFileSync('lista.txt', conteudo);
console.log(`✅ Arquivo lista.txt com ${totalLinhas} linhas gerado com sucesso!`);