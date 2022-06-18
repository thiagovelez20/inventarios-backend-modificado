const { Router } = require('express');
const Usuario = require('../models/Usuario');
const Usuarios = require('../models/Usuario');
const router = Router();
const usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validar-usuario');

//crear nuevo usuario
router.post('/', async function(req, res){

    try {

        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        console.log(req.body);
        
        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        console.log('Respuesta existe usuario', existeUsuario);
        if(existeUsuario) {
            return res.send('Email ya existe');
        }
    
    let usuario = new Usuarios();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();
    res.send(usuario);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/', async function(req, res){
    try {
        const usuarios = await Usuarios.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/:usuarioId',async function(req, res){
    try {

        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.send('Usuario no existe');
        }
        
        const existeUsuarioPorEmail = await Usuario.findOne({ email: req.body.email, _id:{$ne: usuario._id} });
        console.log('Respuesta existe usuario', existeUsuarioPorEmail);
        
        if(existeUsuarioPorEmail) {
            return res.send('Email ya existe');
        }
    
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();
    res.send(usuario);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/:usuarioId', async function(req, res) {
try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) {
        return res.status(404).send('Usuario no existe');
    }
    res.send(usuario);
} catch (error) {
    console.log(error);
    res.status(500).send('Ocurrio un error al consultar el usuario');
}
});

module.exports = router;