import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';
import { TimeSlotPrismaEntity } from '../entities/time-slot.entity';
import { TimeSlotReadFactory } from 'src/booking/domain/factoris/time-slot.factory';
import { BookingStatusEnum } from 'src/booking/domain/enums/booking-status.enum';

export class TimeSlotMapper {
  static toDomain(entity: TimeSlotPrismaEntity): TimeSlotModel {
    return TimeSlotReadFactory.create({
      id: entity.id,
      doctorId: entity.doctorId,
      time: entity.time,
      status: entity.status as BookingStatusEnum,
      patientId: entity.patientId,
      expiresAt: entity.expiresAt,
    });
  }

  static toPersistence(domainModel: TimeSlotModel): TimeSlotPrismaEntity {
    const entity: TimeSlotPrismaEntity = {
      id: domainModel.id,
      doctorId: domainModel.doctorId,
      time: domainModel.time,
      status: domainModel.status as BookingStatusEnum,
      patientId: domainModel.patientId,
      expiresAt: domainModel.expiresAt,
    };
    return entity;
  }
}
