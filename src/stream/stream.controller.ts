import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('stream')
export class StreamController {
    @Get()
    getFile() {
        const file = createReadStream(join(process.cwd(), 'video-nha.mp4'));
        return new StreamableFile(file, {
            disposition: 'inline; filename=README.md',
            type: 'video/mp4'
        })
    }
}
