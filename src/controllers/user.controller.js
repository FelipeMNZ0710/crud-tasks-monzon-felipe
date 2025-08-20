import { models } from '../config/database.js';
const { User, Task, UserProfile } = models;

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Task, as: 'tasks', attributes: ['id', 'title', 'isComplete'] },
        { model: UserProfile, as: 'profile' }
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
  }
};