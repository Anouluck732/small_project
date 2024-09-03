const express = require("express");
const popularController = require("../controller/popular.controller.js");
const upload = require("../middleware/upload.js");
const formatProductImageUrls = require("../middleware/imageUrlFormatter.js");

const app = express.Router();

app.get("/api/product/popular", async (req, res) => {
  try {
    const resp = await popularController.findallpopular(); // Corrected function name
    console.log(resp);
    
    const productsWithImageUrls = formatProductImageUrls(resp, req);
    res.status(200).send(productsWithImageUrls);
  } catch (error) {
    console.error("Error fetching popular products:", error);
    res.status(500).send({ message: "Error fetching popular", error: error.message });
  }
});

module.exports = app;
