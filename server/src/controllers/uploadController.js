import fs from 'fs';
import PlacementRecord from '../models/PlacementRecord.js';
import { trainFromRecords } from '../services/modelService.js';
import { parsePlacementCsv } from '../utils/csvParser.js';

export const uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file is required' });
  }

  try {
    const records = parsePlacementCsv(req.file.path);
    await PlacementRecord.deleteMany({});
    await PlacementRecord.insertMany(records);

    const model = trainFromRecords(records);

    fs.unlinkSync(req.file.path);
    return res.json({ message: 'CSV uploaded and model trained successfully', model });
  } catch (error) {
    return res.status(500).json({ message: 'CSV processing failed', error: error.message });
  }
};
