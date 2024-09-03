const userRepo = require("../repo/user.repo.js");

const findAllUser = async () => {
  return await userRepo.findAllUser();
};

const findUserByEmail = async (email) => {
  return await userRepo.findUserByEmail(email);
};

const createUser = (users) => {
  return userRepo.createUser(users);
};

const deleteUser = (id) => {
  return userRepo.deleteUser(id);
};

const updateUser = (users) => {
  return userRepo.updateUser(users);
};

// New functions for handling refresh tokens
const storeRefreshToken = async (userId, refreshToken) => {
  return await userRepo.storeRefreshToken(userId, refreshToken);
};

const findRefreshToken = async (refreshToken) => {
  return await userRepo.findRefreshToken(refreshToken);
};

const deleteRefreshToken = async (refreshToken) => {
  return await userRepo.deleteRefreshToken(refreshToken);
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
