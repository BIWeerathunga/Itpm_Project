import express from 'express';
import { 
    setBudget, 
    getBudgets, 
    deleteBudget 
} from '../controllers/budgetController.js';

const router = express.Router();

router.route("/").post(setBudget).get(getBudgets);
router.route("/delete").post(deleteBudget);

export default router;