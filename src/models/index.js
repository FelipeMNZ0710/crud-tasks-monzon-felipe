import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConfig from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&         
      file !== path.basename(__filename) && 
      file.slice(-3) === '.js'           
    );
  });

for (const file of modelFiles) {
  const modelDefinition = (await import(path.join('file://', __dirname, file))).default;
  const model = modelDefinition(sequelize, DataTypes);
  db[model.name] = model; 
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); 
  }
});

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 

export default db;