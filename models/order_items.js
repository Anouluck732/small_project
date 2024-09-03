/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_items', {
    oid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'order',
        },
        key: 'oid'
      },
      unique: "oid"
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
      unique: "pid_fk2"
    },
    quantity: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    odid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'order_items'
  });
};
