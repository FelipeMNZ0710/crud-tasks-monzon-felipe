import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Project, { 
      through: 'project_tags',
      as: 'projects'
    });
  };
  
  return Tag;
};