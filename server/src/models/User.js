const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    return super.init({
      admin: DataTypes.BOOLEAN,
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
          notNull: { msg: 'É necessário informar o sobrenome' },
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'É necessário informar o email' },
        }
      },
      password: DataTypes.TEXT,
    }, {
      sequelize,
      tableName: 'user',
      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },
    });
  }

  static associate(models) {
    this.belongsTo(models.Company, {
      foreignKey: { allowNull: false, name: 'company' }
    });
  }

  static hooks() {
    this.beforeCreate(async (user) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
    });
  }
}

module.exports = User;
