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


// Função que retorna dados da conta do profile do usuário
const getAllDados = function (userNumber) {
    let profile = {
        status: false,
        status_code: 404,
        development: 'Victor Hugo Rocha da Silva',
        message: 'Usuário não encontrado.'
    };

    if (dados && dados['whats-users']) {
        // Usa o método .find() para procurar o usuário
        const user = dados['whats-users'].find(item => item.number === userNumber);

        if (user) {
            profile = {
                status: true,
                status_code: 200,
                development: 'Victor Hugo Rocha da Silva',

                profile: {
                    id: user.id,
                    account: user.account,
                    nickname: user.nickname,
                    "created-since": user["created-since"],
                    "profile-image": user["profile-image"],
                    number: user.number,
                    background: user.background
                }
            };
        }
    }

    return profile;
};


module.exports = {
    getAllContacts,
    getAllDados
}

// Testando a função getAllContacts
// console.log(getAllContacts())

// Teste da função getAllDados
console.log(getAllDados('11987876567'))