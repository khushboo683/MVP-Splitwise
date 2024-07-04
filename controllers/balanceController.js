import User from '../models/user.js';

export const getBalance = async (req, res) => {
    try {

        const { friendId, userId } = req.params;

        // Fetch the user by ID and populate their expenses and the members of each expense
        const user = await User.findById(userId)
            .populate({
                path: 'expenses',
                populate: {
                    path: 'members',
                    model: 'User' 
                }
            });

        // Fetch the friend by ID to ensure they exist
        const friend = await User.findById(friendId);

        // If either the user or the friend does not exist, return an error response
        if (!user || !friend) {
            return res.status(400).json('User does not exist');
        }

        // Filter expenses to include only those that involve the friend
        const expensesWithFriend = user.expenses.filter(expense => 
            expense.members.some(member => member._id.toString() === friendId)
        );

        let balance = 0; // Initialize balance to zero

        // Calculate the balance based on the expenses involving the friend
        for (let i = 0; i < expensesWithFriend.length; i++) {
            const expense = expensesWithFriend[i];
            const share = expense.value / expense.members.length; // Calculate the share of each member

            if (expense.paidBy.toString() === userId) {
                // If the user paid, add the share to the balance
                balance += share;
            } else if (expense.paidBy.toString() === friendId) {
                // If the friend paid, subtract the share from the balance
                balance -= share;
            }
        }

        // Respond with the calculated balance
        res.status(200).json(balance);
    } catch (err) {
        res.status(500).json(err); // Respond with an error status if something goes wrong
    }
};
