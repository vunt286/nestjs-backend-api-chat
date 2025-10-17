import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { join } from 'path';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    constructor(private schedulerRegistry: SchedulerRegistry) { }

    addJob(name: string, seconds: string) {
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`);
        });
        this.schedulerRegistry.addCronJob(name, job);
        job.start();
        
    }

    getJob() {
        const jobList = this.schedulerRegistry.getCronJobs();
        const jobs: {}[] = [];
        jobList.forEach((value, key) => {
            const time = value.cronTime.source;
            jobs.push({name: key, time: time});
        });

        return jobs;
    }


    // @Cron(CronExpression.EVERY_5_SECONDS, {
    //     name: 'cronJobSendMail',
    //     timeZone: 'Asia/Ho_Chi_Minh'
    // })
    // handleSendNoti() {
    //     this.logger.debug("send: push noti");
    // }

    // @Interval(3000)
    // handleCheck() {
    //     this.logger.debug('handleCheck....Interval');
    // }

    // @Timeout(6000)
    // handleCheck2() {
    //     this.logger.warn('handleCheck....Timeout');
    // }




}

