import fs from 'fs';
import pdfParse from 'pdf-parse';

export const extractResumeSkills = async (filePath, knownSkills = []) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const text = data.text.toLowerCase();

  return knownSkills.filter((skill) => text.includes(skill.toLowerCase()));
};
