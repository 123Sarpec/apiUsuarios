// Controlador de usuarios

const db = require('../config/db.config.js');
db.sequelize.sync();

const Usuario = db.Usuario;

// Crear un nuevo usuario
exports.create = async (req, res) => {
    try {
        // Construir el objeto de usuario a partir del cuerpo de la solicitud
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email, 
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            fechaRegistro: req.body.fechaRegistro,
            estado: req.body.estado
        };

        // Guardar en la base de datos MySQL
        let result = await Usuario.create(usuario);

        // Enviar mensaje de éxito al cliente
        res.status(200).json({
            message: "Usuario Creado con Éxito = " + result.id,
            usuario: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Error, NO se puede Crear el Usuario!",
            error: error.message
        });
    }
}

// Obtener todos los usuarios
exports.GETALL = async (req, res) => {
    try {
        let tdsusuarios = await Usuario.findAll();
        res.status(200).json({
            message: "Lista de Todos los Usuarios!",
            usuarios: tdsusuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener la lista de usuarios!",
            error: error.message
        });
    }
}

// Obtener usuario por ID
exports.GETBYID = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "No se encontró usuario con el ID = " + usuarioId
            });
        }

        res.status(200).json({
            message: "Usuario encontrado con el ID = " + usuarioId,
            usuario: usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el usuario!",
            error: error.message
        });
    }
}

// Actualizar usuario
exports.updatePut = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "No se encontró al usuario con ID = " + usuarioId
            });
        }

        let updatedObject = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            fechaRegistro: req.body.fechaRegistro,
            estado: req.body.estado
        };

        await Usuario.update(updatedObject, { where: { id: usuarioId } });

        res.status(200).json({
            message: "Usuario Actualizado con Éxito = " + usuarioId,
            usuario: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el usuario = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar usuario
exports.delete = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "No existe el usuario con el ID = " + usuarioId
            });
        }

        await usuario.destroy();

        res.status(200).json({
            message: "Usuario eliminado con Éxito = " + usuarioId,
            usuario: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario = " + req.params.id,
            error: error.message
        });
    }
}
