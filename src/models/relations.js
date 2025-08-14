import User from './User.js';
import Task from './Task.js';
import UserProfile from './UserProfile.js';
import Project from './Project.js';
import Tag from './Tag.js';       

User.hasMany(Task, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

User.hasOne(UserProfile, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

Project.belongsToMany(Tag, { through: 'project_tags' });
Tag.belongsToMany(Project, { through: 'project_tags' });

export { User, Task, UserProfile, Project, Tag };