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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const custom_validator_1 = require("./custom.validator");
let FileController = class FileController {
    uploadFile(file) {
        return {
            filename: file.originalname,
            size: file.size,
            mine: file.mimetype
        };
    }
    uploadFiles(files) {
        const listFile = files.map(file => ({
            filename: file.originalname,
            size: file.size,
            mine: file.mimetype
        }));
        return {
            files: listFile,
            msg: 'upload thanh cong'
        };
    }
    uploadFiles2(files) {
        const listFileAvatar = files.avatar.map(file => ({
            filename: file.originalname,
            size: file.size,
            mine: file.mimetype
        }));
        const listFileProfile = files.profile.map(file => ({
            filename: file.originalname,
            size: file.size,
            mine: file.mimetype
        }));
        return {
            files: [
                listFileAvatar,
                listFileProfile
            ],
            msg: 'upload thanh cong'
        };
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}${file.originalname}`;
                cb(null, filename);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new custom_validator_1.CustomeFileTypeValidator('image/jpeg', 'sai định dạng files')
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('uploads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: 'uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}${file.originalname}`;
                cb(null, filename);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: []
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)('multi-fields'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'avatar', maxCount: 2 },
        { name: 'profile', maxCount: 1 }
    ])),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: []
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadFiles2", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('file')
], FileController);
//# sourceMappingURL=file.controller.js.map