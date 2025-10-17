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
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
let TaskService = TaskService_1 = class TaskService {
    schedulerRegistry;
    logger = new common_1.Logger(TaskService_1.name);
    constructor(schedulerRegistry) {
        this.schedulerRegistry = schedulerRegistry;
    }
    addJob(name, seconds) {
        const job = new cron_1.CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`);
        });
        this.schedulerRegistry.addCronJob(name, job);
        job.start();
    }
    getJob() {
        const jobList = this.schedulerRegistry.getCronJobs();
        const jobs = [];
        jobList.forEach((value, key) => {
            const time = value.cronTime.source;
            jobs.push({ name: key, time: time });
        });
        return jobs;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry])
], TaskService);
//# sourceMappingURL=task.service.js.map