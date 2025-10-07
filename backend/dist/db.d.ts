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
