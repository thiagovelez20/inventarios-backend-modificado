const mongoose = require('mongoose');

const getConnection = async () => {
    try {

        const url = 'mongodb://usuarioBd:p87ViHvlcnXwqOrf@cluster0-shard-00-00.kv4xk.mongodb.net:27017,cluster0-shard-00-01.kv4xk.mongodb.net:27017,cluster0-shard-00-02.kv4xk.mongodb.net:27017/activNode?ssl=true&replicaSet=atlas-tvnbrh-shard-0&authSource=admin&retryWrites=true&w=majority'
        await mongoose.connect(url);

        console.log('conexion exitosa');

    } catch (error) {
        console.log('error');
    }
}

module.exports = {
    getConnection,
}