import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Task, { 
      foreignKey: 'userId', 
      as: 'tasks',
      onDelete: 'CASCADE'
    });
    User.hasOne(models.UserProfile, { 
      foreignKey: 'userId', 
      as: 'profile',
      onDelete: 'CASCADE' 
    });
  };

  return User;
};