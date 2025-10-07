"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const user_1 = require("./user");
exports.router.get('/', (req, res) => {
    console.log('router working fine saaar.-api/v1/');
    res.json({
        message: 'hello from route - api/v1/'
    });
});
exports.router.use('/user', user_1.userRoute);
//# sourceMappingURL=index.js.map