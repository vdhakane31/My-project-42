import fs from 'fs';
import { predictPlacement, getModel } from '../services/modelService.js';
import { extractResumeSkills } from '../services/resumeService.js';

export const predict = async (req, res) => {
  const {
    name,
    branch,
    skills = '',
    aptitudeScore,
    communicationSkills,
    internshipExperience = 'No'
  } = req.body;

  if (!name || !branch || !aptitudeScore || !communicationSkills || !req.file) {
    return res.status(400).json({ message: 'All fields and resume PDF are required' });
  }

  try {
    const submittedSkills = skills
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean);

    const model = getModel();
    const resumeSkills = await extractResumeSkills(req.file.path, model.requiredSkills);
    const mergedSkills = Array.from(new Set([...submittedSkills, ...resumeSkills]));

    const result = predictPlacement({
      aptitudeScore,
      communicationSkills,
      internshipExperience,
      skills: mergedSkills
    });

    fs.unlinkSync(req.file.path);
    return res.json({
      ...result,
      profile: { name, branch }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Prediction failed', error: error.message });
  }
};
