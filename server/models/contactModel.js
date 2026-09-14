import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const submissionsFilePath = path.join(__dirname, '../data/submissions.json');

export const getAllSubmissions = async () => {
  try {
    const data = await fs.readFile(submissionsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

export const saveSubmission = async (newSubmission) => {
  const submissions = await getAllSubmissions();
  const submissionWithMetadata = {
    id: Date.now().toString(),
    ...newSubmission,
    createdAt: new Date().toISOString(),
  };
  submissions.push(submissionWithMetadata);
  await fs.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2), 'utf-8');
  return submissionWithMetadata;
};
