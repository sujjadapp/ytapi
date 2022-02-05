const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const controllers = require("./controllers");
//const Streaming = require("./controllers/Streaming");
const { Result } =  require("./Models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(cors({
    credentials: true,
    origin: true
}));
app.options('*', cors());

controllers(app);

app.get("/*", function(req, res){
  res.json(new Result(null, "Convocação inválida!", -1));
});
app.get('/api/search', (req, res) => {
    controllers.Streaming(req.query.q)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running http://localhost:${port}`);
});
