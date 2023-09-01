//Imports
const config = require("./config");
const indexRouter = require("./routes/index.routes");
const path = require("path");
const express = require("express");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore(config.mysqlConfig);
const morgan = require("morgan");
const checkLogged = require('./middlewares/checkLogged');

// Express.js Server
const app = express();

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// Middleware
app.use(morgan("dev"));
app.use(session({ saveUninitialized: false, resave: false, secret: '54pmkgF@U*AxrA$iQtv4', store: sessionStore }));

//comprobar que se está loggeado para acceder a la carpeta de imagenes de usuario
app.get('/img/userImages/*',checkLogged);

//Acceso a recursos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use('/', indexRouter);

// Server 
app.listen(config.port, function (err) {
  if (err) {
    console.log("ERROR al iniciar el servidor");
  }
  else {
    console.log(`Servidor arrancado en el puerto ${config.port}`);
  }
});