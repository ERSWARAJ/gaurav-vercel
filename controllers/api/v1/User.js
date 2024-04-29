const OPTIONS = require('../../../config/options');
const UserRepository = require('../../../models/repositories/UserRepository');
const ErrorHandleHelper = require('../../../models/helpers/ErrorHandleHelper');

const { resCode } = require('../../../config/options');
const options = require('../../../config/options');

const { customErrorLogger } = ErrorHandleHelper;

exports.login = async (req, res) => {
  try {
    const response = await UserRepository.checkUser(req.body);
    if (!response.success) {
      return res
        .status(resCode.HTTP_BAD_REQUEST)
        .json(OPTIONS.genRes(resCode.HTTP_BAD_REQUEST, response.message));
    }
    return res
      .status(resCode.HTTP_OK)
      .json(OPTIONS.genRes(resCode.HTTP_OK, response));
  } catch (e) {
    customErrorLogger(e);
    return res
      .status(resCode.HTTP_INTERNAL_SERVER_ERROR)
      .json(
        OPTIONS.genRes(
          resCode.HTTP_INTERNAL_SERVER_ERROR,
          OPTIONS.errorMessage.SERVER_ERROR,
          OPTIONS.errorTypes.INTERNAL_SERVER_ERROR
        )
      );
  }
};
exports.signup = async (req, res) => {
  try {
    const response = await UserRepository.createOrUpdateUser(req.body);
    if (!response.success) {
      return res
        .status(resCode.HTTP_BAD_REQUEST)
        .json(OPTIONS.genRes(resCode.HTTP_BAD_REQUEST, response.message));
    }
    return res
      .status(resCode.HTTP_OK)
      .json(OPTIONS.genRes(resCode.HTTP_OK, response));
  } catch (e) {
    customErrorLogger(e);
    return res
      .status(resCode.HTTP_INTERNAL_SERVER_ERROR)
      .json(
        OPTIONS.genRes(
          resCode.HTTP_INTERNAL_SERVER_ERROR,
          OPTIONS.errorMessage.SERVER_ERROR,
          OPTIONS.errorTypes.INTERNAL_SERVER_ERROR
        )
      );
  }
};

exports.getUser = async (req, res) => {
  try {
    const response = await UserRepository.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!response) {
      return res
        .status(resCode.HTTP_BAD_REQUEST)
        .json(
          OPTIONS.genRes(
            resCode.HTTP_BAD_REQUEST,
            options.errorMessage.DATA_NOT_FOUND('User')
          )
        );
    }
    return res
      .status(resCode.HTTP_OK)
      .json(OPTIONS.genRes(resCode.HTTP_OK, response));
  } catch (e) {
    customErrorLogger(e);
    return res
      .status(resCode.HTTP_INTERNAL_SERVER_ERROR)
      .json(
        OPTIONS.genRes(
          resCode.HTTP_INTERNAL_SERVER_ERROR,
          OPTIONS.errorMessage.SERVER_ERROR,
          OPTIONS.errorTypes.INTERNAL_SERVER_ERROR
        )
      );
  }
};
