const express = require("express");
const bodyParser = require ("body-parser");
const db = require('./db/connection');
const port = 8000;

let app = express();
app.use(bodyParser.json());

app.listen(port,()=>{
    console.log("Aplicativo executando na porta " + port);
});

//mostra a lista de contatos
app.get('/contatos', (req, res)=>{
    let cmd_selectAll = "select * from contato;"
    db.query(cmd_selectAll,(err, rows)=>{
        res.status(200).json(rows);
    });
});

//adiciona contatos à lista
app.post('/contatos', (req, res)=>{
    let dados = req.body;
    let comando_insert = "INSERT INTO CONTATO (nome, idade, email) VALUES (?, ?, ?)";
    let dados_body = [dados.nome, dados.idade, dados.email];

    db.query(comando_insert, dados_body, (error, result)=>{
        if(error){
            res.status(400).send({message:error});
        }else{
            res.status(201).json({message: "contato salvo com sucesso!"});
        }
    })
});

//pesquisa os contatos pelo id
app.get('/contatos/:id', (req, res)=>{
    let id = req.params.id;
    let cmd_selectId = "select * from contato where id = ?";
    db.query(cmd_selectId, id, (err, rows)=>{
        res.status(200).json(rows);
    })
});

//deleta os contatos pelo id
app.delete('/contatos/:id', (req, res)=>{
    let id = req.params.id;
    let cmd_delete = "delete from contato where id = ?";

    db.query(cmd_delete, id, (error, result)=>{
        if(error){
            res.status(400).send({message:"erro"})
        }else{
            res.status(201).json({message: "contato excluido com sucesso!"})
        }
    });
});