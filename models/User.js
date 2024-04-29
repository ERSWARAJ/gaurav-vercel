const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const OPTIONS = require('../config/options');
const jwtOPTIONS = require('../config/jwtOptions');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: OPTIONS.defaultStatus.PENDING,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  User.prototype.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };
  User.prototype.validPassword = function (password) {
    return this.password ? bcrypt.compareSync(password, this.password) : false;
  };
  User.prototype.genToken = function () {
    const payload = { id: this.id, role: this.role };
    return jwt.sign(payload, jwtOPTIONS.secretOrKey, {
      expiresIn: jwtOPTIONS.expiry,
    });
  };
  return User;
};
