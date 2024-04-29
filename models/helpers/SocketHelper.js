const chalk = require('chalk');
const AuthHelper = require('./AuthHelper');
const OPTIONS = require('../../config/options');

exports.auth = async (socket) => {
  console.log('Authenticating socket..');
  AuthHelper.verifyJwt(
    socket.handshake.auth.token,
    OPTIONS.usersRoles.getAllRolesAsArray(),
    false
  ).then(({ user: jwtPayload }) => {
    if (jwtPayload && jwtPayload.id) {
      const existingUser = jwtPayload;
      socket.authenticated = true;
      socket.user = existingUser;
      socket.token = socket.handshake.auth.token;
      socket.join(OPTIONS.socketPrivateGroups.GLOBAL_CHANNEL);
      socket.join(OPTIONS.socketPrivateGroups.USER_PRIVATE + existingUser.id);
      socket.join(OPTIONS.socketPublicGroups.USER_PROFILE + existingUser.id);
      console.log(
        '%s Authenticated socket has been established successfully.',
        chalk.green('✓')
      );
    } else {
      console.log('%s Unable to connect to the socket', chalk.red('X'));
      return new Error('Unauthorized access!');
    }
  });
};
