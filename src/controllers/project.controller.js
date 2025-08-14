import Project from '../models/Project.js';
import Tag from '../models/Tag.js';

export const createProject = async (req, res) => {
  try {
    const { name, description, tagIds } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'El nombre del proyecto es obligatorio.' });
    }

    const newProject = await Project.create({ name, description });

    if (tagIds && tagIds.length > 0) {
      await newProject.setTags(tagIds);
    }

    res.status(201).json({ message: 'Proyecto creado exitosamente.', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proyecto.', error: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: {
        model: Tag,
        attributes: ['name'],
        through: { attributes: [] } 
      }
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos.', error: error.message });
  }
};