/** É o módulo principal, polo cal arranca a nosa aplicación, aquí importamos dependencias e executamos gran parte das funcionalidades que necesitamos para que a nosa aplicación funcione correctamente */

const createError = require('http-errors'); // Importamos o módulo `http-errors` para crear obxectos de erro estandarizados
const express = require('express'); // Importamos o framework Express para crear aplicacións web
const path = require('path'); // Importamos o módulo `path` para manipular rutas do sistema de ficheiros
const cookieParser = require('cookie-parser'); // Importamos o middleware `cookie-parser` para analizar as cookies da solicitude
const logger = require('morgan'); // Importamos o middleware `morgan` para rexistrar as solicitudes e respostas HTTP
const { connectDB } = require('./db/db.js'); // Importamos a función `connectDB` do ficheiro `db.js` para a conexión á base de datos
/** Importamos as rutas que asignamos a cada unha das funcións */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const issuesRouter = require('./routes/issues');
const respondersRouter = require('./routes/responders');
const cors = require('cors'); // Importa o middleware `cors` para activar o uso compartido de recursos entre orixes (CORS)

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', true);

/** Chamamos ao método para conectar coa BBDD a través de mongoose */
connectDB();

// Declarando as rutas iniciais de cada un dos módulos route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/issues', issuesRouter);
app.use('/responders', respondersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
    title: 'Error',
  });
});

module.exports = app;
