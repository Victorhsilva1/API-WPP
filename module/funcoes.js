/*********************** 
 * Objetivo: Arquivo de funções para gerenciar a API de contatos e mensagens estilo whatsapp
 * Data: 15/09/2025
 * Autor: Victor Hugo Rocha da Silva
 * Versão: 1.0
*************************/

const MESSAGE_ERRO = {
    status: false,
    status_code: 500,
    development: 'Victor Hugo Rocha da Silva'
}

const dados = require('./contatos.js')

// Função que retorna todos os dados
const getAllContacts = function () {
    let message = {
        status: true,
        status_code: 200,
        development: 'Victor Hugo Rocha da Silva',
        contacts: dados['whats-users'] // Atribuição direta
    };

    dados['whats-users'].forEach(function(item){
        message.contacts.push(item);
    });

    // Verificando se a lista de contatos não está vazia
    if(message.contacts.length > 0) {
        return message; // Retorna a mensagem de sucesso com os contatos
    } else {
        return MESSAGE_ERRO; // Retorna a mensagem de erro
    }
}

module.exports = {
    getAllContacts
}

console.log(getAllContacts())