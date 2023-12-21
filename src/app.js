const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const cors = require ("cors");
const port = 3000;
const acompanhamentoRoutes = require('./routes/acompanhamentoProfRoutes');

app.use(cors());
app.use(bodyParser.json());


app.use(express.static('public'));


app.use('/', acompanhamentoRoutes);


app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`)
})