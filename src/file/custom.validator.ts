import { FileValidator } from "@nestjs/common";
import { log } from "console";

export class CustomeFileTypeValidator extends FileValidator {
    protected mimetype: string;
    protected msg: string;

    constructor(mimetype: string, message: string) {
        super({});
        this.mimetype = mimetype;
        this.msg = message;
    }

    buildErrorMessage(): string {
        return this.msg;
    }

    isValid(file?: Express.Multer.File): boolean {
        log('=================',file?.mimetype , this.mimetype);
        const result = file?.mimetype === this.mimetype;

        return result;
    }

    
}