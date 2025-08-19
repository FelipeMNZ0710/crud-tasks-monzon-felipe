import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const UserProfile = sequelize.define('user_profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_picture_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    timestamps: false
  });

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, { 
      foreignKey: 'userId' 
    });
  };
  
  return UserProfile;
};