const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

// Corrected function name to findallpopular
const findallpopular = async () => {
  try {
    const records = await db.sequelize.query(
      `SELECT p.*, pp.total_sales FROM product p JOIN popular_product pp ON p.pid = pp.pid ORDER BY p.rating DESC LIMIT 10;`,
      {
        nest: true,
        type: QueryTypes.SELECT,
      }
    );
    return records;
  } catch (error) {
    console.error("Find all popular products repo error:", error);
    throw error; // Rethrow error to be handled in the controller
  }
};

module.exports = { findallpopular };
