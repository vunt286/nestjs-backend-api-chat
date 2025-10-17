import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    searchUsers(keyword: string): Promise<User[]>;
}
