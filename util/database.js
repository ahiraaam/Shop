const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = callback =>{
    MongoClient.connect('mongodb+srv://Ahiram:gala2312@cluster0-f8wud.mongodb.net/shop?retryWrites=true')
    .then(client =>{
        console.log('Connected!!!')
        _db = client.db()
        callback()
        
    })
    .catch(err =>{
        console.log(err)
        throw err;
    })
}

const getDb = ()=>{
    if(_db){
        return _db
    }
    throw 'No database found';

}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;



/////////////////////SEQUELIZE//////////////////////////////////////////
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete','root','password',{dialect:'mysql',host:'localhost'})

// module.exports = sequelize;


////////////MYSQL///////////////777
/*const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'password'
})

module.exports = pool.promise();*/