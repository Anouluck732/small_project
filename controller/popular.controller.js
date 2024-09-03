const popularRepo = require("../repo/popular.repo.js");

// Corrected the function name to findallpopular
const findallpopular = async () => {
  return await popularRepo.findallpopular();
};

module.exports = { findallpopular };
