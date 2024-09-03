/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorite', {
    fid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    f_pid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'product',
        },
        key: 'pid'
      },
      unique: "product_favorite"
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
      unique: "user_favorite"
    }
  }, {
    sequelize,
    tableName: 'favorite'
  });
};
