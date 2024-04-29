const OPTIONS = require('../config/options');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      message: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: OPTIONS.defaultStatus.ACTIVE,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sender',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'receiver',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      as: 'coversation',
      onDelete: 'CASCADE',
    });
  };
  return Message;
};
