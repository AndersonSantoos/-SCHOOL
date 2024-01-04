const express = require ("express");
const app = express();
const bodyParser = require ("body-parser");
const cors = require ("cors");
const port = 3000
const acompanhamentoRoutes = require('./routes/profRoutes');
const fonoRouters = require('./routes/fonoRouters');
const psicologico = require('./routes/psicologicoRouters');
const notasRouters = require('./routes/notasRouters');
const coordenadorRouters = require("./routes/coordenadorRouters");
const materiasRouters = require("./routes/materiasRouters");

app.use(cors());
app.use(bodyParser.json());


app.use(express.static('public'));


app.use('/', acompanhamentoRoutes);
app.use('/', fonoRouters);
app.use('/', psicologico);
app.use('/', notasRouters);
app.use('/', coordenadorRouters); 
app.use('/', materiasRouters);


app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`)
});