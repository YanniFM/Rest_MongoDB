'use strict';
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'videojuegos';

exports.obtener_usuario_por_correo = async function (req, res) {
    const database = client.db(dbName);
    const usuarios = database.collection('usuarios');
    const correo = req.params.correo;
    const query = { correoElectrónico: correo };
    const usuario = await usuarios.findOne(query);
    res.end(JSON.stringify(usuario));
};

exports.autenticar_usuario = async function (req, res) {
    const database = client.db(dbName);
    const usuarios = database.collection('usuarios');
    const { correo, contraseña } = req.body;
    const query = { correoElectrónico: correo, contraseña: contraseña };
    const usuario = await usuarios.findOne(query);
    res.end(JSON.stringify(usuario));
};
