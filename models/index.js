const Sequelize = require("sequelize");
const _Users = require("./users.js");
const _Address = require("./address.js");
const _Product = require("./product.js");
const _ProductType = require("./product_type.js");
const _Favorite = require("./favorite.js");
const _Cart = require("./cart.js");
const _Order = require("./order.js");
const _OrderItems = require("./order_items.js");
const _PopularProduct = require("./popular_product.js");


const sequelize = new Sequelize("dbtest", "anouluck", "Sed31820", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  pool: {
    max: 1000,
    min: 100,
  },
});

const connect = async () => {
  try {
    const conn = await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("staring for server error :", error);
  }
};
connect();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = _Users(sequelize, Sequelize);
db.address = _Address(sequelize, Sequelize);
db.product = _Product(sequelize, Sequelize);
db.product_type = _ProductType(sequelize, Sequelize);
db.favorite = _Favorite(sequelize, Sequelize);
db.cart = _Cart(sequelize, Sequelize);
db.order = _Order(sequelize, Sequelize);
db.order_items = _OrderItems(sequelize, Sequelize);
db.popular_product = _PopularProduct(sequelize, Sequelize);

// db.product.hasMany(db.product_type, { as: "product_type", foreignKey: "product_type" });
// db.product_type.belongsTo(db.product, { as: "product_type", foreignKey: "product_type" });

module.exports = db;
