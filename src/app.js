const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const cors = require ("cors");
const port = 3000;
const acompanhamentoRoutes = require('./routes/acompanhamentoProfRoutes');
const fonoRouters = require('./routes/fonoRouters');

app.use(cors());
app.use(bodyParser.json());


app.use(express.static('public'));


app.use('/', acompanhamentoRoutes);
app.use('/', fonoRouters);


app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`)
})