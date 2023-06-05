db.createCollection("usuarios");
db.usuarios.insertOne({
    correo: "usuario1@example.com",
    nombre: "Usuario 1",
    contraseña: "contraseña123"
});
db.usuarios.insertOne({
    correo: "usuario2@example.com",
    nombre: "Usuario 2",
    contraseña: "contraseña456"
});
