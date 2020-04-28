const express = require('express');
const bodyParser = require('body-parser');

var ETL=require('node-etl');
var output=ETL.extract('public/csv/arquivo_geral.csv',{
            delimitor:";",
            headers:["regiao","estado","data","casosNovos", "casosAcumulados", "obitosNovos", "obitosAcumulados"],
            ignore:(line,index)=>index!==0, 
});

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/home', (req, res) => {
//     return res.sendFile(__dirname + '/src/views/home.html');
// });

app.get('/covid', (req, res) => {
    return res.sendFile(__dirname + '/src/views/covid.html');
});

app.get('/api', (req, res) => {
    return res.json(output)
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Server listening on ' + PORT);
});