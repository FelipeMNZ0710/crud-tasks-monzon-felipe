import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from '../models/User.js';
import TaskModel from '../models/Task.js';
import UserProfileModel from '../models/UserProfile.js';
import ProjectModel from '../models/Project.js';
import TagModel from '../models/Tag.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
);

const models = {
  User: UserModel(sequelize),
  Task: TaskModel(sequelize),
  UserProfile: UserProfileModel(sequelize),
  Project: ProjectModel(sequelize),
  Tag: TagModel(sequelize),
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, models };