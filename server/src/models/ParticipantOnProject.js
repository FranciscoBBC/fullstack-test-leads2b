const { DataTypes, Model } = require('sequelize');

class ParticipantOnProject extends Model {
  static init(sequelize) {
    return super.init({
      project: DataTypes.INTEGER,
      employee: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'participantonproject'
    });
  }

  static associate(models) {
    this.belongsTo(models.Project, {
      foreignKey: { allowNull: false, name: 'project' }
    });

    this.belongsTo(models.Employee, {
      foreignKey: { allowNull: false, name: 'employee' }
    });
  }
}

module.exports = ParticipantOnProject;
