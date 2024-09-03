const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const findCartByUserId = async (id) => {
  try {
    const records = await db.sequelize.query(
      "select product.pid,product.name,product.price,product.image,product.qty_product,cart.cart_id,cart.qty,(product.price*cart.qty) as sum_price from cart inner join product on product.pid = cart.pid inner join users on users.id = cart.user_id where users.id=:id;",
      {
        nest: true,
        replacements: { id: id },
        type: QueryTypes.SELECT,
      }
    );
    return records;
  } catch (error) {
    console.log("Find favorite by user id repo error :", error);
  }
};
const totalCart = async (id) => {
  try {
    const records = await db.sequelize.query(
      "SELECT COUNT(cart_id) as count FROM cart WHERE user_id =:id;",
      {
        nest: true,
        replacements: { id: id },
        type: QueryTypes.SELECT,
      }
    );
    return records[0]; // Return the first record from the result array
  } catch (error) {
    console.log("Error in totalCart repo function:", error);
    throw error; // Rethrow the error to be caught by the route handler
  }
};

const createCart = async (cart) => {
  try {
    await db.cart.create(cart);
  } catch (error) {
    console.log("Create favorite error :", error);
  }
};
const deleteCart = async (id) => {
  try {
    await db.cart.destroy({
      where: {
        cart_id: id,
      },
    });
  } catch (error) {
    console.log("Delete favorite error :", error);
  }
};

module.exports = {
  findCartByUserId,
  createCart,
  deleteCart,
  totalCart,
};
