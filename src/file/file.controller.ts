import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CustomeFileTypeValidator } from './custom.validator';

@Controller('file')
export class FileController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}${file.originalname}`;
                cb(null, filename);
            }
        })
    }))
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [
            new CustomeFileTypeValidator('image/jpeg', 'sai định dạng files')
        ]
    })) file: Express.Multer.File) {
        return {
            filename: file.originalname,
            size: file.size,
            mine: file.mimetype
        }
    }

    @Post('uploads')
    @UseInterceptors(FilesInterceptor('files', 5, {
        storage: diskStorage({
            destination: 'uploads',
            filename: (req, file, cb) => {
                const filename = `${Date.now()}${file.originalname}`;
                cb(null, filename);
            }
        })
    }))
    uploadFiles(@UploadedFiles(new ParseFilePipe({
        validators: [
            // new CustomeFileTypeValidator('image/jpeg', 'sai định dạng files')
        ]
    })) files: Express.Multer.File[]) {
        const listFile = files.map(file => ({
            filename: file.originalname,
            size: file.size,
            mine: file.mimetype
        }));

        return {
            files: listFile,
            msg: 'upload thanh cong'
        }
    }


    
    @Post('multi-fields')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'avatar', maxCount: 2},
        {name: 'profile', maxCount: 1}
    ]))
    uploadFiles2(@UploadedFiles(new ParseFilePipe({
        validators: [
            // new CustomeFileTypeValidator('image/jpeg', 'sai định dạng files')
        ]
    })) files: {
        avatar: Express.Multer.File[],
        profile: Express.Multer.File[]
    }) {


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
        }
    }

}
