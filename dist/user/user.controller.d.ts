import { UsersService } from './user.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<import("../auth/user.schema").User[]>;
    search(q: string): Promise<import("../auth/user.schema").User[]>;
    getById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../auth/user.schema").User, {}, {}> & import("../auth/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
