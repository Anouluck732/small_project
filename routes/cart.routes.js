const express = require("express");
const cartController = require("../controller/cart.controller.js");
const upload = require("../middleware/upload.js");
const fs = require("fs");
const path = require("path");
const formatProductImageUrls = require("../middleware/imageUrlFormatter.js");

const app = express.Router();

app.get("/api/cart/list/:id", async (req, res) => {
  try {
    const resp = await cartController.findCartByUserId(req.params.id);
    const productsWithImageUrls = formatProductImageUrls(resp, req);
    res.status(200).send(productsWithImageUrls);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching cart list : ", error: error });
  }
});
app.get("/api/cart/total/:id", async (req, res) => {
  try {
    const resp = await cartController.totalCart(req.params.id);
    res.status(200).send(resp);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching cart total : ", error: error });
  }
});
app.post("/api/cart/create", async (req, res) => {
  try {
    await cartController.createCart(req.body);
    res.status(200).send({ message: "Created cart successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error add cart" + error, error: error });
  }
});
app.delete("/api/cart/delete/:id", async (req, res) => {
  try {
    await cartController.deleteCart(req.params.id);
    res.status(200).send({ message: "Deleted cart successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error delete cart", error: error });
  }
});

module.exports = app;
