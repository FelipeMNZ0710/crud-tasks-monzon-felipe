import { models } from '../config/database.js';
const { Tag } = models;

export const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre de la etiqueta es obligatorio.' });
    const newTag = await Tag.create({ name });
    res.status(201).json({ message: 'Etiqueta creada exitosamente.', tag: newTag });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'El nombre de la etiqueta ya existe.' });
    res.status(500).json({ message: 'Error al crear la etiqueta.', error: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las etiquetas.', error: error.message });
  }
};