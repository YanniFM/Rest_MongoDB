'use strict';
module.exports = function (app) {
    var userController = require('./userController');
    var videojuegoController = require('./videojuegoController');
    var logController = require('./logController');

    app.route('/usuarios/:correo')
        .get(userController.obtener_usuario_por_correo);

    app.route('/autenticacion')
        .post(userController.autenticar_usuario);

    app.route('/videojuegos')
        .post(videojuegoController.guardar_registro_videojuego);

    app.route('/videojuegos/:username')
        .get(videojuegoController.obtener_coleccion_videojuegos);

    app.route('/videojuegos/busqueda/:correo/:busqueda')
        .get(videojuegoController.obtener_registros_videojuegos_busqueda);

    app.route('/videojuegos/plataforma/:correo/:plataforma')
        .get(videojuegoController.obtener_registros_videojuegos_plataforma);

    app.route('/logs')
        .post(logController.guardar_evento_log);

    app.route('/logs/:username')
        .get(logController.obtener_eventos_log_usuario);

    app.route('/logs/fechas/:fechaInicio/:fechaFin')
        .get(logController.obtener_eventos_log_rango_fechas);

    app.route('/logs/busqueda/:correo/:busqueda')
        .get(logController.obtener_eventos_log_busqueda);
};
