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
const unidadesRouters = require("./routes/unidadeRouters");
const atividadeRouters = require("./routes/atividadeRouters");

app.use(cors());
app.use(bodyParser.json());
app.use('/', acompanhamentoRoutes);
app.use('/', fonoRouters);
app.use('/', psicologico);
app.use('/', notasRouters);
app.use('/', coordenadorRouters); 
app.use('/', materiasRouters);
app.use('/', unidadesRouters); 
app.use('/', atividadeRouters);

app.listen(port, () => {
    console.log(`Servidor funcionando na porta: ${port}`)
});