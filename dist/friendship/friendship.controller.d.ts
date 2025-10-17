import { FriendshipService } from './friendship.service';
import { FriendRequestDto } from './dto/create-friendship.dto';
import { FriendRespondDto } from './dto/update-friendship.dto';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    sendRequest(dto: FriendRequestDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/friendship.entity").Friendship, {}, {}> & import("./entities/friendship.entity").Friendship & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    respondRequest(dto: FriendRespondDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/friendship.entity").Friendship, {}, {}> & import("./entities/friendship.entity").Friendship & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getFriends(userId: string): Promise<{
        _id: any;
        username: any;
        email: any;
    }[]>;
    getUsersWithStatus(userId: string): Promise<{
        friendStatus: string;
        username: string;
        email?: string;
        password: string;
        displayName?: string;
        avatar?: string;
        status?: "online" | "offline";
        lastOnline?: Date;
        isActive?: boolean;
        phone?: string;
        _id: import("mongoose").Types.ObjectId;
        __v: number;
    }[]>;
}
