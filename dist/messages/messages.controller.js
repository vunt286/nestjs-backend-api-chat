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
exports.MessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const chat_gateway_1 = require("./chat.gateway");
const conversations_service_1 = require("../conversations/conversations.service");
let MessagesController = class MessagesController {
    messagesService;
    chatGateway;
    conversationsService;
    constructor(messagesService, chatGateway, conversationsService) {
        this.messagesService = messagesService;
        this.chatGateway = chatGateway;
        this.conversationsService = conversationsService;
    }
    async getMessages(conversationId) {
        return this.messagesService.getMessages(conversationId);
    }
    async sendMessage(body) {
        const result = await this.messagesService.sendMessage(body.conversationId, body.senderId, body.text);
        this.chatGateway.sendMessageToConversation(body.conversationId, result);
        const conversation = await this.conversationsService.getConversationById(result?.conversationId);
        if (conversation) {
            console.log(conversation, "conversationconversationconversation");
        }
        return result;
    }
    async markAsRead(body) {
        return this.messagesService.updateRead(body);
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('conversationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Patch)('mark-as-read'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesController.prototype, "markAsRead", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        chat_gateway_1.ChatGateway,
        conversations_service_1.ConversationsService])
], MessagesController);
//# sourceMappingURL=messages.controller.js.map