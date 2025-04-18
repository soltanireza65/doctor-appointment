import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BOOKING_QUEUE, EXPIRE_TIME_SLOT_JOB } from '../../booking.constants';
import { TimeSlotRepository } from '../../ports/time-slot.repository';
import { BookingStatusEnum } from 'src/booking/domain/enums/booking-status.enum';
import { Logger } from '@nestjs/common';

@Processor(BOOKING_QUEUE)
export class ExpireTimeslotsJobProcessor extends WorkerHost {
  private readonly logger = new Logger(ExpireTimeslotsJobProcessor.name);
  constructor(private readonly timeSlotRepository: TimeSlotRepository) {
    super();
  }

  async process(job: Job): Promise<void> {
    if (job.name === EXPIRE_TIME_SLOT_JOB) {
      this.logger.log('Start Expiring time slots');

      const { items: slots } = await this.timeSlotRepository.findAll({
        where: {
          status: BookingStatusEnum.PREBOOKED,
          expiresAt: {
            gte: new Date(),
          },
        },
      });

      slots.forEach((slot) => slot.expire());

      await this.timeSlotRepository.save(slots);

      this.logger.log('End Expiring time slots');
    }
  }
}
