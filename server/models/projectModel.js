import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFilePath = path.join(__dirname, '../data/projects.json');

export const getAllProjects = async () => {
  const data = await fs.readFile(projectsFilePath, 'utf-8');
  return JSON.parse(data);
};

export const getProjectById = async (id) => {
  const projects = await getAllProjects();
  return projects.find((project) => project.id === id) || null;
};
