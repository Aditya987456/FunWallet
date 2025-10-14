"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRoute = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const db_2 = require("../db");
exports.accountRoute = express_1.default.Router();
//api/v1/account/
exports.accountRoute.get('/', (req, res) => {
    res.json({
        message: 'hello from ---> /api/v1/account/'
    });
});
//---- route for to get balance-----
exports.accountRoute.get('/balance', middleware_1.UserMiddleware, async (req, res) => {
    try {
        const account = await db_1.accountModel.findOne({
            //@ts-ignore
            userId: req.userId
        }).populate('userId', 'email');
        res.status(200).json({
            message: 'Your a/c balanace is : ',
            balance: account?.balance,
            //@ts-ignore
            email: account?.userId?.email
        });
    }
    catch (error) {
        return res.status(403).json({
            message: 'Error in getting the balance. Try after sometime'
        });
    }
});
//$$$###################### very important to learn...########################
//----------- route for transfer money. ---------
exports.accountRoute.post('/transfer', middleware_1.UserMiddleware, async (req, res) => {
    //console.log("Transfer request body--------:", req.body); //debug ke liye.
    //*****session is context for sequentical operations...--> maintain consistency.
    const session = await mongoose_1.default.startSession();
    /*  In between if any transaction falls means transaction is aborted and even the half completed
        transaction will roolback   */
    //------------------------------------------------------------------------------------------
    session.startTransaction(); //here transaction started
    try {
        const { amount, receiverId } = req.body;
        if (!amount || typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        const SenderAccount = await db_1.accountModel.findOne(
        //@ts-ignore
        { userId: req.userId }).session(session); //$$$$## here .session(session) means this is the part of transaction running in this session.
        if (!SenderAccount) {
            return res.status(404).json({ message: "Sender not found" });
        }
        if (SenderAccount.balance < amount) {
            return res.status(403).json({ message: "Insufficient balance" });
        }
        const ReceiverAccount = await db_1.accountModel.findOne({ userId: receiverId }).session(session);
        if (!ReceiverAccount) {
            // throw new Error('Receiver not found || invalid receiver.')
            return res.status(404).json({ message: "Receiver not found" });
        }
        //##after passing all checks like - sender+receiver is there , sufficient balance is there noe do transaction...
        //performing transaction.
        await db_1.accountModel.updateOne(//debit money
        //@ts-ignore
        { userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        //******* Sending money transaction history ********** */ 
        await db_2.TransactionHistoryModel.create([{
                userId: SenderAccount.userId,
                amount,
                PaymentType: "send",
            }], { session });
        await db_1.accountModel.updateOne(//credit money.
        { userId: receiverId }, {
            $inc: { balance: amount }
        }).session(session);
        //******* Receiving money transaction history ********** */ 
        await db_2.TransactionHistoryModel.create([{
                userId: ReceiverAccount.userId,
                amount,
                PaymentType: "receive",
            }], { session });
        await session.commitTransaction(); //commit the transaction.
        //------------------------------------------------------------------------------------------
        res.status(200).json({
            message: 'Transaction successfull.'
        });
    }
    catch (error) {
        await session.abortTransaction();
        // console.error("Transaction error--------:", error); // debug ke liye tha.
        return res.status(400).json({
            message: 'Transaction aborted...'
        });
    }
    finally {
        session.endSession();
    }
});
//------- route for add money in own a/c by own
exports.accountRoute.post('/add', middleware_1.UserMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        if (amount > 3000) {
            return res.status(400).json({ error: "Amount exceeds limit of 3000" });
        }
        const SearchUser = await db_1.accountModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (!SearchUser)
            return res.status(404).json({ message: 'Account not found' });
        SearchUser.balance += Number(amount); //Number to convert in number type.
        //#### NOW the balance in DB is updated--> we have to do this ...
        await SearchUser.save();
        //******************* saving transaction history on adding balance. ****************
        await db_2.TransactionHistoryModel.create({
            userId: SearchUser.userId,
            amount,
            PaymentType: "add",
        });
        res.status(200).json({
            message: 'Balance updated',
            balance: SearchUser.balance
        });
    }
    catch (error) {
        res.status(403).json({
            message: 'Error in updating balance'
        });
    }
});
//get transaction history.
exports.accountRoute.get('/gethistory', middleware_1.UserMiddleware, async (req, res) => {
    try {
        const transaction = await db_2.TransactionHistoryModel.find({
            //@ts-ignore
            userId: req.userId
        }).sort({ timestamp: -1 });
        //--for the new account - transaction will be empty.
        if (transaction.length === 0) {
            return res.status(200).json({
                status: 200,
                message: "No transaction history",
                transactions: []
            });
        }
        //-- for the normal user shows the transactions history.
        res.status(200).json({
            status: 200,
            message: "Transaction history fetched",
            transactions: transaction,
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch transaction history',
            transactions: []
        });
    }
});
//# sourceMappingURL=account.js.map