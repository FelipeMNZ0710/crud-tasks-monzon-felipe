import { models } from '../config/database.js';
const { Task, User } = models;

export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'El ID del usuario (userId) es obligatorio.' });
    if (!title || !description) return res.status(400).json({ message: 'El título y la descripción son obligatorios.' });
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) return res.status(400).json({ message: 'El título de la tarea ya existe.' });
    const newTask = await Task.create({ title, description, isComplete, userId });
    res.status(201).json({ message: 'Tarea creada exitosamente.', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la tarea.', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ include: { model: User, as: 'user', attributes: ['id', 'name', 'email'] } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas.', error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, { include: { model: User, as: 'user', attributes: ['id', 'name', 'email'] } });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada.' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea.', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada.' });
    if (title && title !== task.title) {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) return res.status(400).json({ message: 'El título de la tarea ya existe.' });
    }
    await task.update({ title, description, isComplete });
    res.status(200).json({ message: 'Tarea actualizada exitosamente.', task });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea.', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada.' });
    await task.destroy();
    res.status(200).json({ message: 'Tarea eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea.', error: error.message });
  }
};