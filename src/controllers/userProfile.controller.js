import UserProfile from '../models/UserProfile.js';
import User from '../models/User.js';

export const createProfile = async (req, res) => {
  try {
    const { bio, profile_picture_url, location, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'El ID del usuario (userId) es obligatorio.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const existingProfile = await UserProfile.findOne({ where: { userId } });
    if (existingProfile) {
        return res.status(400).json({ message: 'Este usuario ya tiene un perfil.' });
    }

    const newProfile = await UserProfile.create({ bio, profile_picture_url, location, userId });
    res.status(201).json({ message: 'Perfil de usuario creado exitosamente.', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el perfil de usuario.', error: error.message });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.findAll({
      include: {
        model: User,
        attributes: ['name', 'email']
      }
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los perfiles de usuario.', error: error.message });
  }
};