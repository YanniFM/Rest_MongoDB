var express = require('express');
var app = express();
var port = process.env.PORT || 8585;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Servidor escuchando en puerto: ' + port);
