const express = require('express');
const questionController = require('./controllers/QuestionController');
const roomControler = require('./controllers/RoomController');

const routes = express.Router();

routes.get('/', function(req, res) {
    return res.render("index", {page: 'enter-room'});
});

routes.get('/create-pass', function(req, res) {
    return res.render("index", {page: 'create-pass'});
});

routes.get('/room/:roomId', roomControler.open);
routes.post('/create-room', roomControler.create);
routes.post('/enterroom', roomControler.enter);

// falando que o ":nomevar" é um espaço que não sei o valor, vai ser umv var.
routes.post('/question/create/:room', questionController.create);
routes.post('/question/:room/:question/:action', questionController.index);


module.exports = routes;