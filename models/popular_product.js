/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('popular_product', {
    pp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
      unique: "popular_product_ibfk_1"
    },
    popularity_score: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    date_added: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    total_sales: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'popular_product'
  });
};
