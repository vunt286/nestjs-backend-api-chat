import { Document, Types } from 'mongoose';
export declare class Friendship extends Document {
    requester: Types.ObjectId;
    recipient: Types.ObjectId;
    status: string;
}
export declare const FriendshipSchema: import("mongoose").Schema<Friendship, import("mongoose").Model<Friendship, any, any, any, Document<unknown, any, Friendship, any, {}> & Friendship & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Friendship, Document<unknown, {}, import("mongoose").FlatRecord<Friendship>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Friendship> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
