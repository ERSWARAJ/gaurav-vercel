const Socket = require('../../routes/api/v1/Socket');

const connectSocket = async (server, app) => {
  // Socket
  // eslint-disable-next-line import/no-extraneous-dependencies
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  // const { createClient } = require('redis');
  // const { createAdapter } = require('@socket.io/redis-adapter');

  app.set('socketIo', io);
  // const namespace = io.of('/user');
  // namespace.use((socket, next) => {
  //   console.log('%s A user connected to user namespace', chalk.green('✓'));
  //   next();
  // });
  // const pubClient = createClient({
  //   url: `redis://${process.env.REDIS_ENDPOINT}`,
  // });
  // const subClient = pubClient.duplicate();
  // io.adapter(createAdapter(pubClient, subClient));
  Socket(io);
  app.use((req, res, next) => {
    req.io = io;
    next();
  });
};

module.exports = (server, app) => {
  connectSocket(server, app);
};
