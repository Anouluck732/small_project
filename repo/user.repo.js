const { Op } = require("sequelize");
const db = require("../models/index.js");

const findAllUser = () => {
  return db.users.findAll();
};

const findUserByEmail = (user) => {
  return db.users.findAll({
    where: {
      [Op.or]: {
        email: { [Op.like]: `%${user.email}%` },
        name: { [Op.like]: `%${user.name}%` },
      },
    },
  });
};

const createUser = (users) => {
  return db.users.create(users);
};

const deleteUser = (id) => {
  return db.users.destroy({
    where: {
      id: id,
    },
  });
};

const updateUser = (users) => {
  return db.users.update(users, {
    where: {
      id: users.id,
    },
  });
};
// New functions for handling refresh tokens
const storeRefreshToken = (userId, refreshToken) => {
  return db.tokens.create({ userId, refreshToken });
};

const findRefreshToken = (refreshToken) => {
  return db.tokens.findOne({ where: { refreshToken } });
};

const deleteRefreshToken = (refreshToken) => {
  return db.tokens.destroy({ where: { refreshToken } });
};

module.exports = {
  findAllUser,
  findUserByEmail,
  createUser,
  deleteUser,
  updateUser,
  storeRefreshToken, // Export the new function
  findRefreshToken,  // Export the new function
  deleteRefreshToken // Export the new function
};
