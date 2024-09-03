const cartRepo = require("../repo/cart.repo.js");

const findCartByUserId = async (id) => {
  return await cartRepo.findCartByUserId(id);
};
const totalCart = async (id) => {
    try {
      return await cartRepo.totalCart(id);
    } catch (error) {
      console.log("Error in totalCart controller function:", error);
      throw error; // Rethrow the error to be caught by the route handler
    }
  }
const createCart = async (cart) => {
  return await cartRepo.createCart(cart);
};
const deleteCart = async (id) => {
  return await cartRepo.deleteCart(id);
};

module.exports = {
  findCartByUserId,
  createCart,
  deleteCart,
  totalCart,
};
