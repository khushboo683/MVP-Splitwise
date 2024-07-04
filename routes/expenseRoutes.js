import express from 'express';
import { addExpense, getExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';
const router = express.Router();

router.post('/:userId',addExpense);
router.get('/:expenseId',getExpense);
router.patch('/:expenseId',updateExpense);
router.delete('/:expenseId',deleteExpense);


export default router;