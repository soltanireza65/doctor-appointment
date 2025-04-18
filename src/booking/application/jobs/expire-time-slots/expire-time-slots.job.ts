import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { BOOKING_QUEUE, EXPIRE_TIME_SLOT_JOB } from '../../booking.constants';
import { CronExpression } from 'src/shared/enums/cron.enum';

@Injectable()
export class ExpireTimeslotsJob implements OnModuleInit {
  constructor(@InjectQueue(BOOKING_QUEUE) private readonly queue: Queue) {}

  async onModuleInit() {
    await this.queue.add(
      EXPIRE_TIME_SLOT_JOB,
      {},
      {
        repeat: {
          pattern: CronExpression.EVERY_10_SECONDS,
        },
        removeOnComplete: false,
        jobId: EXPIRE_TIME_SLOT_JOB,
      },
    );
  }
}
