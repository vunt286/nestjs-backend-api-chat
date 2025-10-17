"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_entity_1 = require("./entities/message.entity");
const conversation_entity_1 = require("../conversations/entities/conversation.entity");
let MessagesService = class MessagesService {
    messageModel;
    convModel;
    constructor(messageModel, convModel) {
        this.messageModel = messageModel;
        this.convModel = convModel;
    }
    async sendMessage(conversationId, senderId, text) {
        const message = new this.messageModel({
            conversationId: new mongoose_2.Types.ObjectId(conversationId),
            senderId: new mongoose_2.Types.ObjectId(senderId),
            text,
            seenBy: [new mongoose_2.Types.ObjectId(senderId)]
        });
        await message.save();
        await this.convModel.findByIdAndUpdate(conversationId, {
            lastMessage: message ? new mongoose_2.Types.ObjectId(message?._id) : null,
            updatedAt: new Date(),
        });
        return message.populate('senderId', 'username email avatar');
    }
    async getMessages(conversationId) {
        return this.messageModel.find({ conversationId: new mongoose_2.Types.ObjectId(conversationId) }).populate('senderId', 'username email avatar').sort({ createdAt: 1 });
    }
    async updateRead(body) {
        await this.messageModel.updateMany({
            conversationId: body.conversationId,
            seenBy: { $ne: body.userId },
        }, { $push: { seenBy: body.userId } });
        return { success: true };
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(conversation_entity_1.Conversation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map