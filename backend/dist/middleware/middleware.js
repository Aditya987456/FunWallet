"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const UserMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    //console.log("header-----------------"+header)
    //if(!header || !header.startsWith('Bearer')){
    if (!header) {
        return res.status(403).json({
            message: 'Invalid header saar.'
        });
    }
    //const token = header.split(" ")[1]    //since header is - bearer bd887398798h4rrc like this...
    const token = header;
    //now verify token..
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET); //using payload solves problem decodedtoken.id wala.
        //@ts-ignore
        req.userId = decodedToken.id;
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: 'invalid token --> unknown access.'
        });
    }
};
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=middleware.js.map