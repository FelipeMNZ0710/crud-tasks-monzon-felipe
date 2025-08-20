import express from 'express';
import { sequelize } from './config/database.js';

// Importar todas las rutas
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import projectRoutes from './routes/project.routes.js';
import tagRoutes from './routes/tag.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Usar las rutas
app.use('/api', userRoutes);
app.use('/api', taskRoutes);
app.use('/api', projectRoutes);
app.use('/api', tagRoutes);

async function main() {
  try {
    await sequelize.sync({ force: false }); // false para no borrar datos
    console.log('Conexión a la base de datos establecida.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

main();