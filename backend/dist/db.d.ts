import mongoose from "mongoose";
export declare function ConnectDB(): Promise<void>;
export declare const userModel: mongoose.Model<{
    firstname: string;
    email: string;
    password: string;
    lastname?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    firstname: string;
    email: string;
    password: string;
    lastname?: string | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    firstname: string;
    email: string;
    password: string;
    lastname?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstname: string;
    email: string;
    password: string;
    lastname?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    firstname: string;
    email: string;
    password: string;
    lastname?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    firstname: string;
    email: string;
    password: string;
    lastname?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const accountModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const TransactionHistoryModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    amount: number;
    PaymentType: "add" | "receive" | "send";
    timestamp: NativeDate;
    peopleName?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    amount: number;
    PaymentType: "add" | "receive" | "send";
    timestamp: NativeDate;
    peopleName?: string | null | undefined;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    amount: number;
    PaymentType: "add" | "receive" | "send";
    timestamp: NativeDate;
    peopleName?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    amount: number;
    PaymentType: "add" | "receive" | "send";
    timestamp: NativeDate;
    peopleName?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    amount: number;
    PaymentType: "add" | "receive" | "send";
    timestamp: NativeDate;
    peopleName?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    amount: number;
    PaymentType: "add" | "receive" | "send";
    timestamp: NativeDate;
    peopleName?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
