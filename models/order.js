/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    oid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    shipping_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id'
      },
      unique: "order_id"
    }
  }, {
    sequelize,
    tableName: 'order'
  });
};
