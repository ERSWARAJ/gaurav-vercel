const { Op } = require('sequelize');
const { Conversation } = require('..');
const options = require('../../config/options');

exports.createConversation = async (data) => {
  try {
    let conversation = await Conversation.findOne({
      where: {
        [Op.or]: [
          { senderId: data.senderId, receiverId: data.receiverId },
          { senderId: data.receiverId, receiverId: data.senderId },
        ],
      },
    });
    if (conversation) {
      return {
        success: false,
        message: options.errorMessage.ALREADY_EXIST('Conversation'),
      };
    }
    conversation = await Conversation.create(data);
    return {
      success: true,
      data: conversation,
    };
  } catch (e) {
    throw new Error(e);
  }
};

exports.findAll = async (query) => {
  try {
    const conversations = await Conversation.findAll(query);
    return {
      success: true,
      data: conversations,
    };
  } catch (e) {
    throw new Error(e);
  }
};

exports.findOne = async (query) => {
  try {
    const conversations = await Conversation.findOne(query);
    if (!conversations) {
      return {
        success: false,
        data: options.errorMessage.DATA_NOT_FOUND('Conversation'),
      };
    }
    return {
      success: true,
      data: conversations,
    };
  } catch (e) {
    throw new Error(e);
  }
};
