import db from '../models/index.js';
const { Project, Tag } = db;

/**
 * @desc    Asociar un tag existente a un proyecto existente
 * @route   POST /api/projects/:projectId/tags
 */
export const addTagToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { tagId } = req.body;

    if (!tagId) {
      return res.status(400).json({ message: 'El ID del tag (tagId) es obligatorio.' });
    }

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado.' });
    }

    await project.addTag(tag);

    res.status(201).json({ message: 'Tag añadido al proyecto exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al asociar el tag con el proyecto.', error: error.message });
  }
};