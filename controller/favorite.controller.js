const favoriteRepo = require("../repo/favorite.repo.js");

const findFavoriteByUserId = async (id) => {
  return await favoriteRepo.findFavoriteByUserId(id);
};

const createFavorite = async (favorite) => {
  return await favoriteRepo.createFavorite(favorite);
};
const deleteFavorite = async (fid) => {
  return await favoriteRepo.deleteFavorite(fid);
};


module.exports = {
  findFavoriteByUserId,
  createFavorite,
  deleteFavorite,
};
