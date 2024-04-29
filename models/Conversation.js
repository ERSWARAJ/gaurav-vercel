const OPTIONS = require('../config/options');

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversation',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
  Conversation.associate = (models) => {
    Conversation.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sender',
      onDelete: 'CASCADE',
    });
    Conversation.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'receiver',
      onDelete: 'CASCADE',
    });
  };
  return Conversation;
};
