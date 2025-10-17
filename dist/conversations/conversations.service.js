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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conversation_entity_1 = require("./entities/conversation.entity");
let ConversationsService = class ConversationsService {
    conversationModel;
    constructor(conversationModel) {
        this.conversationModel = conversationModel;
    }
    async findOrCreatePrivate(userChat, userGuest) {
        if (!userChat || !userGuest)
            throw new common_1.BadRequestException('Missing user IDs');
        const a = new mongoose_2.Types.ObjectId(userChat);
        const b = new mongoose_2.Types.ObjectId(userGuest);
        let conv = await this.conversationModel.findOne({
            type: 'private',
            members: { $all: [a, b] },
        });
        if (!conv) {
            conv = await this.conversationModel.create({
                type: 'private',
                members: [a, b],
            });
        }
        return conv.populate('members');
    }
    async createGroup(name, members, creatorId) {
        const memberIds = members.map(id => new mongoose_2.Types.ObjectId(id));
        const adminIds = [new mongoose_2.Types.ObjectId(creatorId)];
        const conv = await this.conversationModel.create({
            type: 'group',
            name,
            members: memberIds,
            admins: adminIds,
        });
        return conv.populate(['members', 'admins']);
    }
    async getUserConversations(userId) {
        const conversations = await this.conversationModel
            .find({ members: new mongoose_2.Types.ObjectId(userId) })
            .populate('members', 'username email avatar')
            .populate('admins', 'username email avatar')
            .populate('lastMessage')
            .sort({ updatedAt: -1 })
            .lean();
        const result = conversations.map((conv) => {
            let unread = true;
            if (conv.lastMessage) {
                const seenBys = conv.lastMessage.seenBy;
                unread = seenBys.includes(userId);
            }
            console.log(conv, '==');
            return { ...conv, unread };
        });
        return result;
    }
    async getConversationById(conversationId) {
        return this.conversationModel
            .findById(new mongoose_2.Types.ObjectId(conversationId))
            .populate('members', 'username email avatar');
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_entity_1.Conversation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map