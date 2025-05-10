import express from 'express';
import { generateReport, getReportFormats } from '../controllers/reportController.js';

const router = express.Router();

router.route("/formats").get(getReportFormats);
router.route("/generate").post(generateReport);

export default router;