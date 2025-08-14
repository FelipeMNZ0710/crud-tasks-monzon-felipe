import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import userProfileRoutes from './src/routes/userProfile.routes.js';
import projectRoutes from './src/routes/project.routes.js'; 
import tagRoutes from './src/routes/tag.routes.js';       
import sequelize from './src/config/database.js';

import './src/models/relations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user_profiles', userProfileRoutes);
app.use('/api/projects', projectRoutes); 
app.use('/api/tags', tagRoutes);       

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Conexión y sincronización con la base de datos establecidas correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

startServer();