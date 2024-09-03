/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart', {
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    qty: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'product',
        },
        key: 'pid'
      },
      unique: "pid"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id'
      },
      unique: "user_id"
    }
  }, {
    sequelize,
    tableName: 'cart'
  });
};
