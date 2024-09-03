const orderRepo = require("../repo/order.repo.js");

const order = async (id) => {
  return await orderRepo.order(id);
};
const createOrder = async (order) => {

  return await orderRepo.createOrder(order);
};

module.exports = {
  order,
  createOrder,
};
