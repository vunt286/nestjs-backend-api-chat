import { Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskSer: TaskService) {}
    
    @Post(':name/:second')
    addJob(@Param('name') name: string,@Param('second') second: string) {
        this.taskSer.addJob(name, second);
        return "add job success!";
    }

    @Get()
    getJob() {
        return this.taskSer.getJob();
    }
}
