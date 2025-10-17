import { Document, Types } from 'mongoose';
export declare class Message extends Document {
    conversationId: Types.ObjectId;
    senderId: Types.ObjectId;
    text: string;
    attachments: string[];
    seenBy: Types.ObjectId[];
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message, any, {}> & Message & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
