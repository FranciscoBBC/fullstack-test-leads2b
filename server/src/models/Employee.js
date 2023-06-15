const { DataTypes, Model } = require('sequelize');

class Employee extends Model {
  static init(sequelize) {
    return super.init({
      avatarUrl: DataTypes.STRING,
      company: DataTypes.INTEGER,
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'É necessário informar um nome' },
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'É necessário informar um sobrenome' },
        }
      },
      email: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'employee'
    });
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: { allowNull: false, name: 'company' }
    });
  }
}

module.exports = Employee;
