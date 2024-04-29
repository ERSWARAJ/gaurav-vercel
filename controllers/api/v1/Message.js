const MessageRepository = require('../../../models/repositories/MessageRepository');
const OPTIONS = require('../../../config/options');
const ErrorHandleHelper = require('../../../models/helpers/ErrorHandleHelper');

const { resCode } = require('../../../config/options');
const db = require('../../../models');

const { customErrorLogger } = ErrorHandleHelper;
exports.newMessage = async (req, res) => {
  try {
    const { body } = req;
    body.senderId = req.user.id;
    if (Number(body.receiverId) === Number(body.senderId)) {
      return res
        .status(resCode.HTTP_OK)
        .json(OPTIONS.genRes(resCode.HTTP_OK, { success: true, data: [] }));
    }
    const response = await MessageRepository.createMessage(req.body);
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

exports.getAll = async (req, res) => {
  try {
    const query = {
      where: {
        conversationId: req.params.id,
      },
      include: [
        {
          model: db.User,
          as: 'receiver',
          attributes: ['id'],
        },
        {
          model: db.User,
          as: 'sender',
          attributes: ['id'],
        },
      ],
    };
    const response = await MessageRepository.findAll(query);
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
