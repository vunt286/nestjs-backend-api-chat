import { TaskService } from './task.service';
export declare class TaskController {
    private taskSer;
    constructor(taskSer: TaskService);
    addJob(name: string, second: string): string;
    getJob(): {}[];
}
