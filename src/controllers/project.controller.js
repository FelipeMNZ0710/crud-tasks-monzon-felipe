import { models } from '../config/database.js';
const { Project, Tag } = models;

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre del proyecto es obligatorio.' });
    const newProject = await Project.create({ name, description });
    res.status(201).json({ message: 'Proyecto creado exitosamente.', project: newProject });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') return res.status(400).json({ message: 'El nombre del proyecto ya existe.' });
    res.status(500).json({ message: 'Error al crear el proyecto.', error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: { model: Tag, as: 'tags', attributes: ['id', 'name'], through: { attributes: [] } }
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos.', error: error.message });
  }
};