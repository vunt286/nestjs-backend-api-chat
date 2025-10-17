import { SchedulerRegistry } from '@nestjs/schedule';
export declare class TaskService {
    private schedulerRegistry;
    private readonly logger;
    constructor(schedulerRegistry: SchedulerRegistry);
    addJob(name: string, seconds: string): void;
    getJob(): {}[];
}
