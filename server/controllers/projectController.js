import * as projectModel from '../models/projectModel.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
