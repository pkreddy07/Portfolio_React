import express from 'express';
import { handleContactSubmit, getContactSubmissions } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', handleContactSubmit);
router.get('/', getContactSubmissions);

export default router;
