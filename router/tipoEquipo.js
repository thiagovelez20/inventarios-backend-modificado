const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const router = Router();
const { validarTipoEquipo } = require('../helpers/validar-tipoEquipo');

//codigo nuevo
const tipoEquipo = require('../models/TipoEquipo');

router.post('/', async function(req, res) {
    try {

        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        console.log(req.body);
    
        let tipoequipo = new TipoEquipo();
        tipoequipo.nombre = req.body.nombre;
        tipoequipo.estado = req.body.estado;
        tipoequipo.fechaCreacion = new Date();
        tipoequipo.fechaActualizacion = new Date();
    
        tipoequipo = await tipoequipo.save();
        res.send(tipoequipo);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/', async function(req, res) {
    try {
        const tipoE = await TipoEquipo.find();
        res.send(tipoE);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/:tipoEquipoId',async function(req, res) {
    try {

        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        console.log(req.body);

        let tipoequipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (!tipoequipo) {
            return res.send('El tipo del equipo no esta definido');
        }

        tipoequipo.nombre = req.body.nombre;
        tipoequipo.estado = req.body.estado;
        tipoequipo.fechaCreacion = new Date();
        tipoequipo.fechaActualizacion = new Date();
    
        tipoequipo = await tipoequipo.save();
        res.send(tipoequipo);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/:tipoId', async function(req, res) {
    try {
        const tipo = await TipoEquipo.findById(req.params.tipoId);
        if (!tipo) {
            return res.status(404).send('Tipo Equipo no existe');
        }
        res.send(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar el Tipo Equipo');
    }
    });

module.exports = router;
