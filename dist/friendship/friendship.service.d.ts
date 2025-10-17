import { FriendRequestDto } from './dto/create-friendship.dto';
import { FriendRespondDto } from './dto/update-friendship.dto';
import { Friendship } from './entities/friendship.entity';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { ConversationsService } from 'src/conversations/conversations.service';
export declare class FriendshipService {
    private friendshipModel;
    private userModel;
    private readonly conversationsService;
    constructor(friendshipModel: Model<Friendship>, userModel: Model<User>, conversationsService: ConversationsService);
    sendFriendRequest(dto: FriendRequestDto): Promise<import("mongoose").Document<unknown, {}, Friendship, {}, {}> & Friendship & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    respondFriendRequest(dto: FriendRespondDto): Promise<import("mongoose").Document<unknown, {}, Friendship, {}, {}> & Friendship & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getFriends(userId: string): Promise<{
        _id: any;
        username: any;
        email: any;
    }[]>;
    getUsersWithFriendStatus(userId: string): Promise<{
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
