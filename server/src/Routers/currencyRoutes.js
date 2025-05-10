import express from 'express';
import { 
    updateTransactionCurrency, 
    setUserBaseCurrency 
} from '../controllers/currencyController.js';

const router = express.Router();

router.route("/transaction").post(updateTransactionCurrency);
router.route("/user").post(setUserBaseCurrency);

export default router;