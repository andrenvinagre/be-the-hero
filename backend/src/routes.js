const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

/**
 * Rota / Recurso
 */

 /*
 * Métodos HTTP
 * GET: buscar uma informação
 * POST: criar uma informação
 * PUT: alterar uma informação
 * DELETE: deletar uma informação
 */

 /**
  * Tipos de parâmtros
  * Query params: parâmetros nomeados enviados na rota após "?" (filtros, paginação)
  * Route params: parâmetros utilizados para identificar recursos (Ex: users/:id)
  * Request Body: corpo da requisição, utilizada para criar ou alterar recursos
  */

  /**
   * SQL: MySQL, SQLite, PostgreeSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB, etc
   */

   /**
    * DRIVER: select * from users
    * Query builder: table('users').select('*').where() // vantagem que não precisa mudar de banco para banco (é feito automaticamente - convert js na consulta)
    */

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
//app.get('/users', (request, response) => { //exemplo query params
//app.get('/users/:id', (request, response) => { //exemplo route params
//const params = request.query; //recuperar query params
//const params = request.params;    
//recuperar route params
//console.log(params);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), ProfileController.index);

module.exports = routes;