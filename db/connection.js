const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'agenda'
});

connection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Conectado");
    }
});

module.exports = connection;