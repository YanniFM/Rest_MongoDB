'use strict';
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'videojuegos';

exports.guardar_registro_videojuego = async function (req, res) {
    const database = client.db(dbName);
    const videojuegos = database.collection('videojuegos');
    const { username, idVideojuego, nombre, plataforma, comentarios } = req.body;
    const query = { nombre:nombre};
    const videojuego = await videojuegos.findOne(query);
    const update = { username:username, idVideojuego:idVideojuego, nombre:nombre, plataforma:plataforma, comentarios:comentarios };
    console.log(videojuego)
    console.log(update)
    const result = await videojuegos.replaceOne(videojuego, update);
    res.end();
};

exports.obtener_coleccion_videojuegos = async function (req, res) {
    const database = client.db(dbName);
    const usuarios = database.collection('videojuegos');
    const username = req.params.username;
    const query = { username:username };
    const usuario = await usuarios.find(query).toArray();
    res.end(JSON.stringify(usuario));
};

exports.obtener_registros_videojuegos_busqueda = async function (req, res) {
    const database = client.db(dbName);
    const usuarios = database.collection('videojuegos');
    const { busqueda } = req.params;
    const query = {'videojuegos.nombre': { $regex: busqueda, $options: 'i' } };
    const projection = { _id: 0, videojuegos: { $elemMatch: { nombre: { $regex: busqueda, $options: 'i' } } } };
    const options = { projection: projection };
    const usuario = await usuarios.findOne(query, options);
    res.end(JSON.stringify(usuario.videojuegos));
};

exports.obtener_registros_videojuegos_plataforma = async function (req, res) {
    const database = client.db(dbName);
    const usuarios = database.collection('videojuegos');
    const { plataforma } = req.params;
    const query = {'videojuegos.plataforma': plataforma };
    const options = { projection: { _id: 0, videojuegos: 1 } };
    const usuario = await usuarios.findOne(query, options);
    res.end(JSON.stringify(usuario.videojuegos));
};
