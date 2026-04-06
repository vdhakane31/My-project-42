import fs from 'fs';
import path from 'path';

const MODEL_FILE = path.resolve('data/model.json');
const BASELINE = {
  aptitudeWeight: 0.5,
  communicationWeight: 0.3,
  internshipWeight: 0.2,
  threshold: 60,
  requiredSkills: ['javascript', 'react', 'node.js', 'sql', 'communication']
};

export const saveModel = (model) => {
  const dir = path.dirname(MODEL_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(MODEL_FILE, JSON.stringify(model, null, 2), 'utf-8');
};

export const getModel = () => {
  if (!fs.existsSync(MODEL_FILE)) {
    saveModel(BASELINE);
    return BASELINE;
  }
  return JSON.parse(fs.readFileSync(MODEL_FILE, 'utf-8'));
};

export const trainFromRecords = (records) => {
  if (!records.length) {
    return getModel();
  }

  const selected = records.filter((record) => record.placementStatus === 'Selected');
  const avgAptitude = selected.reduce((sum, item) => sum + item.aptitudeScore, 0) / Math.max(selected.length, 1);
  const avgCommunication =
    selected.reduce((sum, item) => sum + item.communicationSkills, 0) / Math.max(selected.length, 1);
  const internshipRate = selected.filter((item) => item.internship).length / Math.max(selected.length, 1);

  const skillFrequency = {};
  selected.forEach((item) => {
    item.skills.forEach((skill) => {
      const normalized = skill.toLowerCase().trim();
      skillFrequency[normalized] = (skillFrequency[normalized] || 0) + 1;
    });
  });

  const requiredSkills = Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([skill]) => skill);

  const model = {
    aptitudeWeight: 0.5,
    communicationWeight: 0.3,
    internshipWeight: 0.2,
    threshold: Math.min(95, Math.max(45, avgAptitude * 0.7 + avgCommunication * 3)),
    referenceAptitude: avgAptitude,
    referenceCommunication: avgCommunication,
    internshipRate,
    requiredSkills: requiredSkills.length ? requiredSkills : BASELINE.requiredSkills
  };

  saveModel(model);
  return model;
};

export const predictPlacement = ({ aptitudeScore, communicationSkills, internshipExperience, skills }) => {
  const model = getModel();

  const aptitudeComponent = Number(aptitudeScore) * model.aptitudeWeight;
  const communicationComponent = Number(communicationSkills) * 10 * model.communicationWeight;
  const internshipComponent = (internshipExperience === 'Yes' ? 100 : 0) * model.internshipWeight;

  const weightedScore = aptitudeComponent + communicationComponent + internshipComponent;
  const confidence = Math.min(99, Math.max(1, weightedScore));
  const status = weightedScore >= model.threshold ? 'Selected' : 'Not Selected';

  const normalizedSkills = skills.map((skill) => skill.toLowerCase().trim());
  const missingSkills = model.requiredSkills.filter((required) => !normalizedSkills.includes(required));

  const suggestions = [];
  if (Number(aptitudeScore) < 70) suggestions.push('Increase aptitude score above 70 through mock tests.');
  if (Number(communicationSkills) < 7) suggestions.push('Work on communication via presentations and group discussions.');
  if (missingSkills.length) suggestions.push(`Improve skills: ${missingSkills.slice(0, 5).join(', ')}`);
  if (internshipExperience === 'No') suggestions.push('Try to gain internship or project-based practical experience.');
  if (!suggestions.length) suggestions.push('Great profile. Keep practicing interview and coding rounds.');

  return {
    status,
    confidence,
    suggestions,
    missingSkills
  };
};
