import { Document, Types } from 'mongoose';
export declare class Conversation extends Document {
    type: string;
    name: string;
    avatar: string;
    members: Types.ObjectId[];
    admins: Types.ObjectId[];
    lastMessage: Types.ObjectId;
    seenBy: string[];
}
export declare const ConversationSchema: import("mongoose").Schema<Conversation, import("mongoose").Model<Conversation, any, any, any, Document<unknown, any, Conversation, any, {}> & Conversation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Conversation, Document<unknown, {}, import("mongoose").FlatRecord<Conversation>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Conversation> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
