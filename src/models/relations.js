import User from './User.js';
import Task from './Task.js';

User.hasMany(Task, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'CASCADE'
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

export { User, Task };