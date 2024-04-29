const { User } = require('..');
const { errorMessage } = require('../../config/options');

exports.checkUser = async (body) => {
  try {
    let user = await User.findOne({
      where: { email: body.email },
    });
    if (user) {
      if (user.password === body.password) {
        const token = await user.genToken();
        user = user.toJSON();
        user.token = token;
        delete user.password;
      } else {
        return {
          success: false,
          message: errorMessage.INVALID_CREDENTIALS,
        };
      }
    } else {
      return {
        success: false,
        message: errorMessage.DATA_NOT_FOUND('User'),
      };
    }
    return {
      success: true,
      data: user,
    };
  } catch (e) {
    throw new Error(e);
  }
};
exports.createOrUpdateUser = async (data) => {
  try {
    let user = await User.findOne({
      where: { email: data.email },
    });
    if (user) {
      user = await user.update(data);
    } else {
      user = await User.create(data);
    }
    return {
      success: true,
      data: user,
    };
  } catch (e) {
    throw new Error(e);
  }
};

exports.findOne = async (query) => await User.findOne(query);
exports.findAll = async (query) => await User.findAll(query);
