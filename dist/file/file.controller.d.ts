export declare class FileController {
    uploadFile(file: Express.Multer.File): {
        filename: string;
        size: number;
        mine: string;
    };
    uploadFiles(files: Express.Multer.File[]): {
        files: {
            filename: string;
            size: number;
            mine: string;
        }[];
        msg: string;
    };
    uploadFiles2(files: {
        avatar: Express.Multer.File[];
        profile: Express.Multer.File[];
    }): {
        files: {
            filename: string;
            size: number;
            mine: string;
        }[][];
        msg: string;
    };
}
