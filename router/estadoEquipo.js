const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const router = Router();
const { validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');

//codigo nuevo
const estadoEquipo = require('../models/EstadoEquipo');

router.post('/', async function(req, res) {

    try {

        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }


        console.log(req.body);
    
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/', async function(req, res) {
    try {
        const estadoE = await EstadoEquipo.find();
        res.send(estadoE);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/:estadoEquipoId',async function(req, res) {
    
    try {

        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        console.log(req.body);

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if (!estadoEquipo) {
            return res.send('El estado del equipo no esta definido');
        }
        
       /* const existeUsuarioPorEstado = await EstadoEquipo.findOne({ estado: req.body.estado, _id:{$ne: estadoEquipo._id} });
        console.log('Respuesta existe estado', existeUsuarioPorEstado);
        
        if(existeUsuarioPorEstado) {
            return res.send('estado ya existe');
        }*/
    
        
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/:estadoId', async function(req, res) {
    try {
        const estado = await EstadoEquipo.findById(req.params.estadoId);
        if (!estado) {
            return res.status(404).send('Estado Equipo no existe');
        }
        res.send(estado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar el Estado Equipo');
    }
    });

module.exports = router;