const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const productFindAll = async (user_id, filters) => {
  try {
    const whereClause = [];

    if (filters.name) {
      whereClause.push(`product.name LIKE :name`);
    }
    if (filters.ptid) {
      whereClause.push(`product.ptid = :ptid`);
    }
    if (filters.minPrice) {
      whereClause.push(`product.price >= :minPrice`);
    }
    if (filters.maxPrice) {
      whereClause.push(`product.price <= :maxPrice`);
    }

    const whereQuery = whereClause.length ? `WHERE ${whereClause.join(' AND ')}` : '';

    const query = `
      SELECT product.pid, product.name, product.price, product.ptid, product.rating, product.description, product.image, 
      GROUP_CONCAT(DISTINCT favorite.user_id ORDER BY favorite.user_id ASC SEPARATOR ', ') AS favorites 
      FROM product 
      LEFT JOIN favorite ON product.pid = favorite.f_pid 
      LEFT JOIN users ON users.id = favorite.user_id 
      ${whereQuery}
      GROUP BY product.pid, product.name, product.price, product.ptid, product.rating, product.description, product.image;
    `;

    const records = await db.sequelize.query(query, {
      replacements: {
        user_id,
        name: `%${filters.name || ''}%`,
        ptid: filters.ptid,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      },
      type: QueryTypes.SELECT,
      nest: true,
    });

    return records;
  } catch (error) {
    console.error("Find favorite by user id repo error:", error);
  }
};

const createProduct = async (product) => {
  return await db.product.create(product);
};
const updateProduct = async (pid, updatedProduct) => {
  return await db.product.update(updatedProduct, {
    where: {
      pid: pid,
    },
  });
};
const productDetail = async (pid) => {
  return await db.product.findByPk(pid);
};

module.exports = {
  productFindAll,
  createProduct,
  updateProduct,
  productDetail,
};
