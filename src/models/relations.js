import User from './User.js';
import Task from './Task.js';
import UserProfile from './UserProfile.js';

User.hasMany(Task, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'CASCADE'
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

UserProfile.belongsTo(User, {
  foreignKey: 'userId'
});

export { User, Task, UserProfile };