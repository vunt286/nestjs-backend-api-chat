"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const messages_controller_1 = require("./messages.controller");
const mongoose_1 = require("@nestjs/mongoose");
const message_entity_1 = require("./entities/message.entity");
const conversation_entity_1 = require("../conversations/entities/conversation.entity");
const conversations_module_1 = require("../conversations/conversations.module");
const chat_gateway_1 = require("./chat.gateway");
const conversations_service_1 = require("../conversations/conversations.service");
let MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule;
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: message_entity_1.Message.name, schema: message_entity_1.MessageSchema },
                { name: conversation_entity_1.Conversation.name, schema: conversation_entity_1.ConversationSchema },
            ]),
            conversations_module_1.ConversationsModule
        ],
        controllers: [messages_controller_1.MessagesController],
        providers: [messages_service_1.MessagesService, chat_gateway_1.ChatGateway, conversations_service_1.ConversationsService],
        exports: [messages_service_1.MessagesService]
    })
], MessagesModule);
//# sourceMappingURL=messages.module.js.map