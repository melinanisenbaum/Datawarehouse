require('dotenv').config();
const express = require('express');
const multer = require('multer');//manejo de imagenes... ver vedeo fazt
const morgan = require('morgan');//dev info sobre peticiones
const path = require('path');//manejo de directorios 
const config = require('./config/config.js');
const { _sequelize } = require('./config/database.js');
const helmet = require('helmet');//seguridad
const cors = require('cors');//permite que se comuniquen dos servidores

//Initializations
const app = express();

//Middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),//donde coloca imagenes cuando se suben al servidor
    filename(req, file, callback) {
        callback(null, new Date().getTime() + path.extname(file.originalname));
    }
})
//let allowCrossDomain = function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', "*");
  //res.header('Access-Control-Allow-Headers', "*");
  //next();
//}
//app.use(allowCrossDomain);
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));//interpretacion de formulario como json
app.use(cors());
app.use(express.static(__dirname + 'backend/public'));

//Routes localhost:3000
app.use('/', require('./routes/login'));
//app.use('/token', require('./routes/token'));
app.use('/users', require('./routes/users'));
app.use('/contacts', require('./routes/contacts'));
app.use('/regions', require('./routes/regions'));
app.use('/countries', require('./routes/countries'));
app.use('/cities', require('./routes/cities'));
app.use('/companies', require('./routes/companies'));
app.use('/channels', require('./routes/channels'));

//Static files(le digo al servidor que archivos van al navegador: htmls css, imagenes, etc)
app.use(express.static(path.join(__dirname, 'public')));

//helpers 

//Starting server 
app.listen(config.PORT, config.HOST, function () {
    console.log(`App listening on port http://${config.HOST}:${config.PORT}`);
});

//DB Connection
try {
    _sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

module.exports = { config, app }