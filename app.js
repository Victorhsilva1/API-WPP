/*********************** 
  Objetivo: endPoints referentes a API de mensagens e contatos
 * Data: 15/09/2025
 * Autor: Victor Hugo Rocha da Silva
 * Versão: 1.0
*************************/


const express = require('express') // Responsável pela API
const cors = require('cors') // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser') // Responsável por gerenciar a chegada dos dados da API com o front


const dados = require('./module/funcoes.js')


// Retorna a porta do servidor atual ou colocamos uma porta local 
const PORT = process.PORT || 8080

// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões 
app.use((request, response, next)=>{
    // Servidor de origem da API
    response.header('Access-Control-Allow-Origin', '*')
    // Verbos permitidos na API
    response.header('Access-Control-Allow-Methods', 'GET')
    //Carrega as configurações no cors da API
    // As permissões que estão sendo utilizadas aqui, colocando restrições
    app.use(cors())
    // Next é o proximo, no caso carregar os próximos endPoints
    next()
})


app.get('/v1/whatsapp/user/chat', function(request, response){
  let userNumber = request.query.userNumber;
  let contactNumber = request.query.contactNumber;

  console.log(userNumber)
  console.log(contactNumber)
  let conversation = dados.getMessagesUser(userNumber, contactNumber);

  response.status(conversation.status_code);
  response.json(conversation);
});

app.get('/v1/whatsapp/users/filter', function(request, response){
  let userNumber = request.query.userNumber;
  let contactNumber = request.query.contactNumber;
  let keyword = request.query.keyword; 

  let filteredMessages = dados.getFilterMessages(userNumber, contactNumber, keyword);

  response.status(filteredMessages.status_code);
  response.json(filteredMessages);
});

app.get('/v1/whatsapp', function(request, response){
  let listaDeContatos = dados.getAllContacts();

    response.status(listaDeContatos.status_code);
    response.json(listaDeContatos);
});


app.get('/v1/whatsapp/user/:userNumber', function(request, response){
    let userNumber = request.params.userNumber;
    let userProfile = dados.getAllDados(userNumber);

    response.status(userProfile.status_code);
    response.json(userProfile);
});

app.get('/v1/whatsapp/user/:userNumber/contacts', function(request, response){
    let userNumber = request.params.userNumber;
    let contactList = dados.getListContact(userNumber);

    response.status(contactList.status_code);
    response.json(contactList);
});

app.get('/v1/whatsapp/user/:userNumber/messages', function(request, response){
    let userNumber = request.params.userNumber;
    let allMessages = dados.getAllMessages(userNumber);

    response.status(allMessages.status_code);
    response.json(allMessages);
});


app.listen(PORT, function(){
  console.log('API rodando em http://localhost:8080')
})


/* 
    getAllContacts,
    getAllDados,
    getListContact,
    getAllMessages,
    getMessagesUser,
    getFilterMessages
    */ 