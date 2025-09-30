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
        } else {
            return MESSAGE_ERRO; // Retorna a mensagem de erro
        }
    }

    return profile;
};


// Função para listar dados de contato para cada usuário nome, foto e descrição)
const getListContact = function (userNumber) {
    let response = {
        status: false,
        status_code: 404,
        development: 'Victor Hugo Rocha da Silva',
        message: 'Usuário não encontrado.'
    };

    //retornando somente se as condições forem verdadeiras
    if (dados && dados['whats-users']) {
        // Usa o método .find() para procurar o usuário
        const user = dados['whats-users'].find(item => item.number === userNumber);

        if (user) {
            const contactsList = user.contacts.map(contact => {
                return {
                    name: contact.name,
                    description: contact.description,
                    image: contact.image
                }
            });

            response = {
                status: true,
                status_code: 200,
                development: 'Victor Hugo Rocha da Silva',
                contacts: contactsList
            };
        } else {
            return MESSAGE_ERRO; // Retorna a mensagem de erro
        }
    }

    return response;
};



// Função para listar todas as mensagens trocadas de uma conta de usuário
const getAllMessages = function (userNumber) {
    let response = {
        status: false,
        status_code: 404,
        development: 'Victor Hugo Rocha da Silva',
        message: 'Usuário não encontrado.'
    };
    
    if (dados && dados['whats-users']) {
        // Usa o método .find() para procurar o usuário
        const user = dados['whats-users'].find(item => item.number === userNumber);

        if (user) {
            // Usa flatMap para achatar os arrays de mensagens de todos os contatos em um único array
            const allMessages = user.contacts.flatMap(contact => contact.messages);

            response = {
                status: true,
                status_code: 200,
                development: 'Victor Hugo Rocha da Silva',
                messages: allMessages
            };
            
        } else {
            return MESSAGE_ERRO; // Retorna a mensagem de erro
        }
    }
    return response;
};

//Função para Listar uma conversa de um usuário e um contato
// passando nome, número de celular e as conversas
// query no app.js
const getMessagesUser = function (userNumber, contactNumber) {
    let response = {
        status: false,
        status_code: 404,
        development: 'Victor Hugo Rocha da Silva',
        message: 'Usuário não encontrado.'
    };
    
    if (dados && dados['whats-users']) {
        const user = dados['whats-users'].find(item => item.number === userNumber);

        if (user) {
            const contact = user.contacts.find(item => item.number === contactNumber);

            if (contact) {
                response = {
                    status: true,
                    status_code: 200,
                    development: 'Victor Hugo Rocha da Silva',

                    //pegando as requisições
                    conversation: {
                        name: contact.name,
                        number: contact.number,
                        messages: contact.messages
                    }
                };
            } else {
                return MESSAGE_ERRO; // Retorna a mensagem de erro
            }
        }
    }
    return response;
};

module.exports = {
    getAllContacts,
    getAllDados,
    getListContact,
    getAllMessages,
    getMessagesUser
}

// Testando a função getAllContacts
// console.log(getAllContacts())

//Teste função getAllDados
// console.log(getAllDados('11987876567'))

// Teste da função getListContact
// console.log(getListContact('11987876567'))

// Teste da função getAllMessages
// console.log(getAllMessages ('11966578996'))

// Teste da função getMessagesUser
// console.log(getMessagesUser('11987876567', '26999999963'))