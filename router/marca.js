const { Router } = require('express');
const Marca = require('../models/Marca');
const router = Router();
const marca = require('../models/Usuario');
const { validarMarca } = require('../helpers/validar-marca');
//codigo nuevo


router.post('/', async function(req, res) {

    try {    
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
    
        marca = await marca.save();
        res.send(marca);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }

   
});

router.get('/', async function(req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);

    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error al consultar Usuarios');
    }
});

router.put('/:marcaId',async function(req, res) {
    
    try {
    
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
    
        marca = await marca.save();
        res.send(marca);
        
    } catch (error) {
        console.log(error);
        res.send('ocurrio un error');
    }
});

router.get('/:marcaId', async function(req, res) {
    try {
        const marca = await Marca.findById(req.params.marcaId);
        if (!marca) {
            return res.status(404).send('Marca no existe');
        }
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar la marca');
    }
    });

module.exports = router;

