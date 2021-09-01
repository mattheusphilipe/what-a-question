const express = require('express');

const routes = express.Router();

routes.get('/', function(req, res) {
    return res.render("index");
});


routes.get('/room', function(req, res) {
    return res.render("room");
});

routes.get('/create-pass', function(req, res) {
    return res.render("create-pass");
});

module.exports = routes;