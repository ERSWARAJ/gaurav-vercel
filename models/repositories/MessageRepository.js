const { Op } = require('sequelize');
const { Message } = require('..');
const ConversationRepository = require('./ConversationRepository');

exports.createMessage = async (data) => {
  try {
    let conversation = await ConversationRepository.findOne({
      where: {
        [Op.or]: [
          { senderId: data.senderId, receiverId: data.receiverId },
          { senderId: data.receiverId, receiverId: data.senderId },
        ],
      },
    });
    if (conversation.success) {
      data.conversationId = conversation.data.id;
    } else {
      conversation = await ConversationRepository.createConversation({
        senderId: data.senderId,
        receiverId: data.receiverId,
      });

      data.conversationId = conversation.data.id;
    }
    const response = await Message.create(data);
    return {
      success: true,
      data: response,
    };
  } catch (e) {
    throw new Error(e);
  }
};

exports.findAll = async (query) => {
  try {
    const response = await Message.findAll(query);
    return {
      success: true,
      data: response,
    };
  } catch (e) {
    throw new Error(e);
  }
};
