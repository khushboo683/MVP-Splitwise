import Expense from '../models/expense.js';
import User from '../models/user.js';
export const addExpense = async(req,res)=>{
    try{
     const{userId} = req.params;
     const user = await User.findById(userId);
     const { name, value, currency, paidBy, members } = req.body;

     // add new expense to db
     const expense = await new Expense({
       name,
       value,
       currency: currency || user?.currency,
       paidBy,
       members
     })
     await expense.save();

     // for each members associated with this expense, add the expense ID in the expenses array for each member
     await Promise.all(members.map(async (memberId) => {
        const member = await User.findById(memberId);
        if (member) {
          member.expenses.push(expense._id);
          await member.save();
        }
      }));

      // return expense as the response
    res.status(201).json(expense);
    }catch(err){
        res.status(500).json(err);
    }
}
export const getExpense = async(req,res)=>{
    try{
        const {expenseId} = req.params;
        const expense = await Expense.findById(expenseId);
        if(!expense){
            res.status(400).json('Expense does not exists.')
        }
        res.status(200).json(expense);
    }catch(err){
        res.status(500).json(err);
    }
}
export const updateExpense = async(req,res)=>{
    try{
      const {expenseId} = req.params;
      const {name,value,currency,paidBy,members} = req.body;
      const expense = await Expense.findByIdAndUpdate(expenseId,{
        name,
        value,
        currency,
        paidBy,
        members
      },{
        new:true,
      });
      if(!expense){
        res.status(400).json('Expense does not exists.')
      }
      res.status(201).json(expense);
    }catch(err){
        res.status(500).json(err);
    }
}    
export const deleteExpense=async(req,res)=>{
    try{
    const {expenseId} = req.params;
    const expense = await Expense.findByIdAndDelete(expenseId);
    if(!expense){
        res.status(400).json('Expense does not exists.');
    }
    console.log("expense delete",expense)
    const users = await User.find({ expenses: expenseId });

    // If no users are found, skip the update process
    if (users.length) {
        // Update each user to remove the expenseId from their expenses array
        const updatePromises = users.map(user =>
            User.findByIdAndUpdate(
                user._id,
                { $pull: { expenses: expenseId } },
                { new: true }
            )
        );
        await Promise.all(updatePromises);
    }
    res.status(201).json('Expense deleted successfully.');
    }catch(err){
        res.status(500).json(err);
    }
}