import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Project = sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
    }
  });

  Project.associate = (models) => {
    Project.belongsToMany(models.Tag, { 
      through: 'project_tags',
      as: 'tags'
    });
  };

  return Project;
};