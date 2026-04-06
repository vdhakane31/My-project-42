import mongoose from 'mongoose';

const placementRecordSchema = new mongoose.Schema(
  {
    skills: { type: [String], required: true },
    aptitudeScore: { type: Number, required: true },
    communicationSkills: { type: Number, required: true },
    internship: { type: Boolean, required: true },
    placementStatus: { type: String, enum: ['Selected', 'Not Selected'], required: true }
  },
  { timestamps: true }
);

export default mongoose.model('PlacementRecord', placementRecordSchema);
