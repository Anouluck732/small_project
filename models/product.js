/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    pid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ptid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'product_type',
        },
        key: 'ptid'
      },
      unique: "product_type"
    },
    rating: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    review: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    sold: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    qty_product: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product'
  });
};
