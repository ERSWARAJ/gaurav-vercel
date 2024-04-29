const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const cors = require('cors');
// const { Server } = require('socket.io');
// const { createServer } = require('http');
require('dotenv').config();
/**
 * Create Express server.
 */

const app = express();

app.use(cors({ origin: true }));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'SECRET',
//   })
// );

/**
 * Socket configuration.
 */
// require('./models/helpers/InitializeConnectionHelper')(server, app);

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// io.on('connection', (socket) => {
//   console.log('Connected', socket.id);
// });
/**
 * Start Express server.
 */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

/**
 * Express configuration.
 */

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

// application specific logging, throwing an error, or other logic here
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('req body', req.body);
    console.log('req query', req.query);
  }
  next();
});
// Routes
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

module.exports = app;
