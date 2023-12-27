const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const cors = require ("cors");
const port = 3000;
const acompanhamentoRoutes = require('./routes/profRoutes');
const fonoRouters = require('./routes/fonoRouters');
const psicologico = require('./routes/psicologicoRouters');

app.use(cors());
app.use(bodyParser.json());


app.use(express.static('public'));


app.use('/', acompanhamentoRoutes);
app.use('/', fonoRouters);
app.use('/', psicologico);


app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`)
})