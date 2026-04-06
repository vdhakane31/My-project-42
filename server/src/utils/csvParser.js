import fs from 'fs';
import { parse } from 'csv-parse/sync';

export const parsePlacementCsv = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  return rows.map((row) => ({
    skills: String(row.Skills || row.skills || '')
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean),
    aptitudeScore: Number(row['Aptitude Score'] || row.aptitudeScore || 0),
    communicationSkills: Number(row['Communication Skills'] || row.communicationSkills || 0),
    internship: String(row.Internship || row.internship || 'No').toLowerCase() === 'yes',
    placementStatus:
      String(row['Placement Status'] || row.placementStatus || 'Not Selected').toLowerCase() === 'selected'
        ? 'Selected'
        : 'Not Selected'
  }));
};
