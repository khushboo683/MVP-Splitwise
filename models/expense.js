import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    name: {type:String, required: true},
    value: {type: Number, required:true},
    currency: {type:String, required:true},
    paidBy: {type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    members: [{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}],
},{
    timestamps:true
})

const Expense = new mongoose.model('Expense',expenseSchema);

export default Expense;