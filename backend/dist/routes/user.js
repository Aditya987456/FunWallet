"use strict";
//user router-- api/v1/user all are come here.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const middleware_1 = require("../middleware/middleware");
const saltRounds = 6;
exports.userRoute = express_1.default.Router();
exports.userRoute.get('/', (req, res) => {
    res.json({
        message: 'response from api/v1/user/ saaaaar'
    });
});
//input validated by zod for signup.
const inputValidate = zod_1.z.object({
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.userRoute.post('/signup', async (req, res) => {
    try {
        //#1: validate input using zod.
        const isInputValid = inputValidate.safeParse(req.body);
        if (!isInputValid.success) {
            return res.status(411).json({
                message: "Incorrect input formate."
            });
        }
        const { firstname, lastname, email, password } = req.body;
        //console.log(firstname, lastname, email, password)
        //#2:now check is user is uniques or not using email.
        const uniqueUser = await db_1.userModel.findOne({ email });
        if (uniqueUser) {
            return res.status(403).json({
                message: 'User already exist.'
            });
        }
        //#3:bcrypt password.
        const hashedpassword = await bcrypt_1.default.hash(password, saltRounds);
        //#4: now everything is ok now so store in DB.
        const newUser = await db_1.userModel.create({
            firstname,
            lastname,
            email,
            password: hashedpassword
        });
        ///-----------------account created with balance from 1k - 10k.-----------------------
        const userId = newUser._id; //new user ka id for the reference....
        await db_1.accountModel.create({
            userId,
            balance: (1 + Math.random()) * 10000
        });
        ///------------------------------------------------------------------------------------
        res.status(200).json({
            message: "You have successsfully signed up."
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ error: "Username already exists" });
        }
        return res.status(500).json({
            message: 'Error in sign up...',
            Error: error
        });
    }
});
//input validation using zod for signin.
const inputValidateSignin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.userRoute.post('/signin', async (req, res) => {
    try {
        //#1: validate input
        const validateInput = inputValidateSignin.safeParse(req.body);
        const { email, password } = req.body;
        //#2:find the user using matching gmail---here gmail is unique.
        const userExist = await db_1.userModel.findOne({ email });
        if (!userExist) {
            return res.status(403).json({
                message: 'Invalid emaild. Try again'
            });
        }
        //#3:if user exist now compare password.
        const passwordValid = await bcrypt_1.default.compare(password, userExist.password);
        if (!passwordValid) {
            return res.status(403).json({
                message: 'Invalid password. Try again'
            });
        }
        //#4: after all ok then jwt signin for the token.
        const token = jsonwebtoken_1.default.sign({ id: userExist._id }, config_1.JWT_SECRET);
        res.status(200).json({
            message: 'Signin Successfully...',
            token: token
        });
    }
    catch (error) {
        return res.status(411).json({
            message: "Error in signing in right now."
        });
    }
});
//Route to update user information.---> other than email...
const Updatebody = zod_1.z.object({
    password: zod_1.z.string().optional(),
    firstname: zod_1.z.string().optional(),
    lastname: zod_1.z.string().optional()
});
exports.userRoute.put('/', middleware_1.UserMiddleware, async (req, res) => {
    try {
        const updateInputValid = Updatebody.safeParse(req.body);
        if (!updateInputValid.success) {
            res.status(411).json({
                message: 'Error while updating information.'
            });
        }
        const { firstname, lastname, password } = req.body;
        //######: for update in mongodb --> expect in object therefore firstly create a update object then
        const updateInputs = {}; //this is the object...
        if (firstname) {
            updateInputs.firstname = firstname;
        }
        if (lastname) {
            updateInputs.lastname = lastname;
        }
        if (password) {
            const hashedpassword = await bcrypt_1.default.hash(password, saltRounds);
            updateInputs.password = hashedpassword;
        }
        //????? if no field for update then??????
        //now call to db for update.
        await db_1.userModel.updateOne(
        //@ts-ignore
        { _id: req.userId }, { $set: updateInputs });
        res.status(200).json({
            message: 'Updated details successfully.'
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error in updating details.'
        });
    }
});
//######### important thing to learn---
//Route to get users from backend, via firstname or lastname.
exports.userRoute.get('/bulk', middleware_1.UserMiddleware, async (req, res) => {
    const filter = req.query.filter;
    try {
        const users = await db_1.userModel.find({
            $or: [
                { firstname: { $regex: filter, $options: "i" } }, //i for searching case sensitive also.
                { lastname: { $regex: filter, $options: "i" } }
            ]
        });
        res.json({
            user: users.map(EachUser => ({
                email: EachUser.email,
                firstname: EachUser.firstname,
                lastname: EachUser.lastname,
                _id: EachUser._id
            }))
        });
    }
    catch (error) {
        return res.status(403).json({
            message: 'Error in searching.'
        });
    }
});
//# sourceMappingURL=user.js.map