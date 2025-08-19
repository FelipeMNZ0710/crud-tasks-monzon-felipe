import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { 
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Task;
};