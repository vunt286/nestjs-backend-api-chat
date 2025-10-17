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
exports.FriendshipService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const friendship_entity_1 = require("./entities/friendship.entity");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/user.schema");
const common_1 = require("@nestjs/common");
const conversations_service_1 = require("../conversations/conversations.service");
let FriendshipService = class FriendshipService {
    friendshipModel;
    userModel;
    conversationsService;
    constructor(friendshipModel, userModel, conversationsService) {
        this.friendshipModel = friendshipModel;
        this.userModel = userModel;
        this.conversationsService = conversationsService;
    }
    async sendFriendRequest(dto) {
        const { requesterId, recipientId } = dto;
        if (requesterId === recipientId)
            throw new common_1.BadRequestException("Cannot add yourself");
        const existing = await this.friendshipModel.findOne({
            $or: [
                { requester: requesterId, recipient: recipientId },
                { requester: recipientId, recipient: requesterId },
            ],
        });
        if (existing)
            throw new common_1.BadRequestException("Friend request already exists");
        const friendship = await this.friendshipModel.create({
            requester: requesterId,
            recipient: recipientId,
        });
        return friendship;
    }
    async respondFriendRequest(dto) {
        const { requesterId, recipientId, action } = dto;
        const friendship = await this.friendshipModel.findOne({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending',
        });
        console.log({
            requester: requesterId,
            recipient: recipientId,
            status: 'pending',
        });
        if (!friendship)
            throw new common_1.NotFoundException("Friend request not found");
        friendship.status = action === 'accept' ? 'accepted' : 'rejected';
        await friendship.save();
        await this.conversationsService.findOrCreatePrivate(recipientId, requesterId);
        return friendship;
    }
    async getFriends(userId) {
        const friends = await this.friendshipModel.find({
            status: 'accepted',
            $or: [{ requester: userId }, { recipient: userId }],
        })
            .populate('requester', 'username email')
            .populate('recipient', 'username email');
        return friends.map(f => {
            const friend = f.requester._id.equals(userId) ? f.recipient : f.requester;
            return { _id: friend._id, username: friend.username, email: friend.email };
        });
    }
    async getUsersWithFriendStatus(userId) {
        const users = await this.userModel.find({ _id: { $ne: userId } });
        const friendships = await this.friendshipModel.find({
            $or: [
                { requester: userId },
                { recipient: userId },
            ]
        }).lean();
        return users.map(u => {
            const f = friendships.find(f => f.requester.toString() === u._id.toString() ||
                f.recipient.toString() === u._id.toString());
            let friendStatus = 'none';
            if (f) {
                if (f.status === 'accepted')
                    friendStatus = 'friend';
                else if (f.status === 'pending') {
                    friendStatus = f.requester.toString() === userId ? 'pending' : 'request_received';
                }
            }
            return { ...u.toObject(), friendStatus };
        });
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(friendship_entity_1.Friendship.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        conversations_service_1.ConversationsService])
], FriendshipService);
//# sourceMappingURL=friendship.service.js.map