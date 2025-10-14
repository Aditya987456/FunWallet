"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHistoryModel = exports.accountModel = exports.userModel = void 0;
exports.ConnectDB = ConnectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
//---------------------    db connection    ----------------------
async function ConnectDB() {
    const url = config_1.MONGODB_URL;
    if (!url) {
        throw new Error("DB_URL is not defined in .env");
    }
    try {
        await mongoose_1.default.connect(url);
        console.log("DB is connected.");
    }
    catch (error) {
        console.log('Error in connecting to DB.');
    }
}
//---------- schema for user.
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
});
exports.userModel = mongoose_1.default.model('user', userSchema);
//----------- schema for account-----
const accountSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: { type: Number, required: true }
});
exports.accountModel = mongoose_1.default.model('account', accountSchema);
//--------------- Schema for the transaction ----------------
const TransactionHistory = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    amount: { type: Number, required: true },
    PaymentType: { type: String, enum: ["add", "receive", "send"], required: true },
    timestamp: { type: Date, default: Date.now }
});
exports.TransactionHistoryModel = mongoose_1.default.model('transaction', TransactionHistory);
//# sourceMappingURL=db.js.map