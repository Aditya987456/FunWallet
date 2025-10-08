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
exports.accountRoute = express_1.default.Router();
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
        });
        res.status(200).json({
            message: 'Your a/c balanace is : ',
            balance: account?.balance
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
    //*****session is context for sequentical operations...--> maintain consistency.
    const session = await mongoose_1.default.startSession();
    /*  In between if any transaction falls means transaction is aborted and even the half completed
        transaction will roolback   */
    //------------------------------------------------------------------------------------------
    session.startTransaction(); //here transaction started
    try {
        const { amount, receiverId } = req.body;
        const SenderAccount = await db_1.accountModel.findOne(
        //@ts-ignore
        { userId: req.userId }).session(session); //$$$$## here .session(session) means this is the part of transaction running in this session.
        if (!SenderAccount) {
            throw new Error('Sender not found');
        }
        if (SenderAccount.balance < amount) {
            throw new Error('Insufficient balance');
        }
        const ReceiverAccount = await db_1.accountModel.findOne({ userId: receiverId }).session(session);
        if (!ReceiverAccount) {
            throw new Error('Receiver not found || invalid receiver.');
        }
        //after passing all checks like - sender+receiver is there , sufficient balance is there noe do transaction...
        //performing transaction.
        await db_1.accountModel.updateOne(//debit money
        //@ts-ignore
        { userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await db_1.accountModel.updateOne(//credit money.
        { userId: receiverId }, {
            $inc: { balance: amount }
        }).session(session);
        await session.commitTransaction(); //commit the transaction.
        //------------------------------------------------------------------------------------------
        res.status(200).json({
            message: 'Transaction successfull.'
        });
    }
    catch (error) {
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Transaction aborted...'
        });
    }
    finally {
        session.endSession();
    }
});
//# sourceMappingURL=account.js.map