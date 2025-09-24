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


app.get('/v1/whatsapp', function(request, response){

})