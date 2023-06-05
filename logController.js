'use strict';
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'videojuegos';

exports.guardar_evento_log = async function (req, res) {
    const database = client.db(dbName);
    const logs = database.collection('logs');
    const {username, fechaEvento, evento} = req.body;
    const result = await logs.insertOne({username:username,fechaEvento:fechaEvento, evento:evento});
    res.end();
};

exports.obtener_eventos_log_usuario = async function (req, res) {
    const database = client.db(dbName);
    const logs = database.collection('logs');
    const username = req.params.username;
    const query = { username:username };
    const eventos = await logs.find(query).toArray();
    res.end(JSON.stringify(eventos));
};

exports.obtener_eventos_log_rango_fechas = async function (req, res) {
    const database = client.db(dbName);
    const logs = database.collection('logs');
    const { fechaInicio, fechaFin } = req.params;
    const query = { fechaEvento: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) } };
    const eventos = await logs.find(query).toArray();
    res.end(JSON.stringify(eventos));
};

exports.obtener_eventos_log_busqueda = async function (req, res) {
    const database = client.db(dbName);
    const logs = database.collection('logs');
    const { correo, busqueda } = req.params;
    const query = { correoElectrónico: correo, evento: { $regex: busqueda, $options: 'i' } };
    const eventos = await logs.find(query).toArray();
    res.end(JSON.stringify(eventos));
};
