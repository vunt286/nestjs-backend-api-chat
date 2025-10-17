"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomeFileTypeValidator = void 0;
const common_1 = require("@nestjs/common");
const console_1 = require("console");
class CustomeFileTypeValidator extends common_1.FileValidator {
    mimetype;
    msg;
    constructor(mimetype, message) {
        super({});
        this.mimetype = mimetype;
        this.msg = message;
    }
    buildErrorMessage() {
        return this.msg;
    }
    isValid(file) {
        (0, console_1.log)('=================', file?.mimetype, this.mimetype);
        const result = file?.mimetype === this.mimetype;
        return result;
    }
}
exports.CustomeFileTypeValidator = CustomeFileTypeValidator;
//# sourceMappingURL=custom.validator.js.map