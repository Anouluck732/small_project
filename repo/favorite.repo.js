const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");

const findFavoriteByUserId = async (id) => {
  try {
    const records = await db.sequelize.query(
      "select * from users join favorite on users.id=favorite.user_id join product on product.pid=favorite.f_pid where users.id=:id;",
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

const createFavorite = async (favorite) => {
  try {
    await db.favorite.create(favorite);
  } catch (error) {
    console.log("Create favorite error :", error);
  }
};
const deleteFavorite = async (fid) => {
  try {
    await db.favorite.destroy({
      where: {
        fid: fid,
      },
    });
  } catch (error) {
    console.log("Delete favorite error :", error);
  }
};

module.exports = {
  findFavoriteByUserId,
  createFavorite,
  deleteFavorite,
};
