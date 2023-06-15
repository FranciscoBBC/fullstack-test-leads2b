const { DataTypes, Model } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
    return super.init({
      company: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'É necessário informar um título' },
        }
      }
    }, {
      sequelize,
      tableName: 'project'
    });
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: { allowNull: false, name: 'company' }
    });
  }
}

module.exports = Project;
