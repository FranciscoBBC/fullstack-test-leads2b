const { DataTypes, Model } = require('sequelize');

class Skill extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'É necessário informar um nome' },
        }
      },
      company: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'skill'
    });
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: { allowNull: false, name: 'company' }
    });
  }
}

module.exports = Skill;
