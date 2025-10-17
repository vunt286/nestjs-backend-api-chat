import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(username: string, password: string, extra?: any): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    validateUser(username: string, password: string): Promise<(import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    login(username: string, password: string): Promise<{
        access_token: string;
        user: {
            _id: unknown;
            username: string;
            displayName: string | undefined;
            avatar: string | undefined;
        };
    }>;
}
