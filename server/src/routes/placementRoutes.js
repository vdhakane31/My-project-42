import { Router } from 'express';
import { predict } from '../controllers/predictController.js';
import { uploadCsv } from '../controllers/uploadController.js';
import { authenticate, authorizeRole } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/upload', authenticate, authorizeRole('tpo'), upload.single('file'), uploadCsv);
router.post('/predict', authenticate, authorizeRole('student'), upload.single('resume'), predict);

export default router;
