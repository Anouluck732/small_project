/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    adid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vilage: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    district: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(45),
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
      unique: "user"
    }
  }, {
    sequelize,
    tableName: 'address'
  });
};
