import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  timestamps: false
});

export default UserProfile;