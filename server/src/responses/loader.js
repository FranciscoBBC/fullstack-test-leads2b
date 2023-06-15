const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const responsesPath = `${__dirname}/../responses`;

const files = fs.readdirSync(responsesPath).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
});

let formatters = [];

files.map(file => {
  const responseTitle = path.parse(file).name;
  const responseFormat = require(path.join(responsesPath, file));
  formatters[responseTitle] = responseFormat;
});

function generateFormatsForRes(req, res, next) {
  for(let title in formatters) {
    const formatter = formatters[title];
    res[title] = formatter.bind({ res });
  }

  next();
}

module.exports = generateFormatsForRes;
