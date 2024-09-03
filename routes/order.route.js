const express = require("express");
const orderController = require("../controller/order.controller.js");
const upload = require("../middleware/upload.js");
const app = express.Router();
const formatProductImageUrls = require("../middleware/imageUrlFormatter.js");

app.get("/api/order/history/:id", async (req, res) => {
  try {
    const resp = await orderController.order(req.params.id);
    const productsWithImageUrls = formatProductImageUrls(resp, req);
    res.status(200).send(productsWithImageUrls);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error listing order", error: error.message });
  }
});

app.post("/api/order/create", async (req, res) => {
  try {
    await orderController.createOrder(req.body);
    res.status(200).send({ message: "Created order successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error add order", error: error });
  }
});
module.exports = app;
