const product = require("./product.routes.js");
const favorite = require("./favorite.routes.js");
const cart = require("./cart.routes.js");
const order = require("./order.route.js");
const popular = require("./popular.routes.js");

const express = require("express");
const app = express.Router();
app.use(product);
app.use(favorite);
app.use(cart);
app.use(order);
app.use(popular);

module.exports = app;
