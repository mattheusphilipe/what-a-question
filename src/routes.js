const express = require('express');
const questionController = require('./controllers/QuestionController');
const roomControler = require('./controllers/RoomController');

const routes = express.Router();

routes.get('/', function(req, res) {
    return res.render("index", {page: 'enter-room'});
});


routes.get('/room/:roomId', function(req, res) {
    return res.render("room");
});

routes.get('/create-pass', function(req, res) {
    return res.render("index", {page: 'create-pass'});
});

// falando que o ":nomevar" é um espaço que não sei o valor, vai ser umv var.
routes.post('/question/:room/:question/:action', questionController.index);
routes.post('/create-room', roomControler.create);

module.exports = routes;