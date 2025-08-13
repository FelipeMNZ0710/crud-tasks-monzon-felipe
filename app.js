import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import sequelize from './src/config/database.js';

import './src/models/relations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

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