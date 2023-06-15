const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const databases = require('../../config/databases.js');

const basename = path.basename(__filename);
const modelsPath = `${__dirname}/../models`;
const config = databases.sqlite[process.env.NODE_ENV || 'development'];

let sequelize = new Sequelize(config);
let db = {};

const files = fs.readdirSync(modelsPath).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});

files.forEach((file) => {
  let model = require(path.join(modelsPath, file));
  model = model.init(sequelize);

  db[model.name] = model;
});

for(let modelName in db) {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }

  if(db[modelName].hooks) {
    db[modelName].hooks();
  }
}

sequelize.sync();

db.sequelize = sequelize;

module.exports = db;
