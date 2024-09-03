const productRepo = require("../repo/product.repo.js");

const productFindAll = async (user_id, filters = {}) => {
  try {
    return await productRepo.productFindAll(user_id, filters);
  } catch (error) {
    console.error("Error in productFindAll controller:", error);
    throw error;
  }
};


const createProduct = async (product) => {
  return await productRepo.createProduct(product); // Correct function call
};
const updateProduct = async (pid, updatedProduct) => {
  return await productRepo.updateProduct(pid, updatedProduct);
};
const productDetail = async (pid) => {
  return await productRepo.productDetail(pid);
};

module.exports = {
  productFindAll,
  createProduct,
  updateProduct,
  productDetail
};
