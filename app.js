import express from 'express';
import bodyParser from 'body-parser';
import { connectDb } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
const app = express(); // initialize express framework
app.use(bodyParser.json()); // use body parser

// connect to database
connectDb(); 

// route handlers
app.use('/splitwise/users',userRoutes); 
app.use('/splitwise/expenses',expenseRoutes);
app.use('/splitwise/balances',balanceRoutes);

// connecting to port
app.listen(3000,()=>{
    console.log('App listening on port 3000');
})



