import { BookingStatusEnum } from '../enums/booking-status.enum';
import { TimeSlotModel, TimeSlotModelArgs } from '../models/time-slot.model';

type TimeSlotReadFactoryArgs = TimeSlotModelArgs;

type TimeSlotWriteFactoryArgs = TimeSlotReadFactoryArgs;

export class TimeSlotReadFactory {
  static create(args: TimeSlotReadFactoryArgs): TimeSlotModel {
    return new TimeSlotModel(args);
  }
}

export class TimeSlotWriteFactory {
  static create(args: TimeSlotWriteFactoryArgs): TimeSlotModel {
    return new TimeSlotModel(args);
  }
}
