import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está en uso.' });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado exitosamente.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario.', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario.', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'El email ya está en uso.' });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();
    res.status(200).json({ message: 'Usuario actualizado exitosamente.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
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