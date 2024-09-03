const express = require("express");
const favoriteController = require("../controller/favorite.controller.js");
const upload = require("../middleware/upload.js");
const fs = require("fs");
const path = require("path");
const formatProductImageUrls = require("../middleware/imageUrlFormatter.js");

const app = express.Router();

app.get("/api/favorite/list/:id", async (req, res) => {
  try {
    const resp = await favoriteController.findFavoriteByUserId(req.params.id);
    const productsWithImageUrls = formatProductImageUrls(resp, req);
    res.status(200).send(productsWithImageUrls);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error: error });
  }
});

app.post("/api/favorite/create", async (req, res) => {
  try {
    await favoriteController.createFavorite(req.body);
    res.status(200).send({ message: "Created favorite successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error add favorite", error: error });
  }
});
app.delete("/api/favorite/delete/:fid", async (req, res) => {
  try {
    await favoriteController.deleteFavorite(req.params.fid);
    res.status(200).send({ message: "Deleted favorite successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error delete favorite", error: error });
  }
});

module.exports = app;
