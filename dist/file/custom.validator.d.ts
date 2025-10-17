import { FileValidator } from "@nestjs/common";
export declare class CustomeFileTypeValidator extends FileValidator {
    protected mimetype: string;
    protected msg: string;
    constructor(mimetype: string, message: string);
    buildErrorMessage(): string;
    isValid(file?: Express.Multer.File): boolean;
}
