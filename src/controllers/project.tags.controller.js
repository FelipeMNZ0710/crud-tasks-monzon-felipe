import db from '../models/index.js';
const { Project, Tag } = db;

/**
 * @desc    Crear un nuevo proyecto
 * @route   POST /api/projects
 */
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre del proyecto es obligatorio.' });
    }

    const existingProject = await Project.findOne({ where: { name } });
    if (existingProject) {
      return res.status(400).json({ message: 'El nombre del proyecto ya existe.' });
    }

    const newProject = await Project.create({ name, description });

    res.status(201).json({ message: 'Proyecto creado exitosamente.', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proyecto.', error: error.message });
  }
};

/**
 * @desc    Obtener todos los proyectos con sus tags
 * @route   GET /api/projects
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: Tag,
        as: 'tags', 
        attributes: ['id', 'name'],
        through: { attributes: [] } 
      }
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos.', error: error.message });
  }
};