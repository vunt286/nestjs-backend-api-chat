import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    username: string;
    email?: string;
    password: string;
    displayName?: string;
    avatar?: string;
    status?: 'online' | 'offline';
    lastOnline?: Date;
    isActive?: boolean;
    phone?: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
