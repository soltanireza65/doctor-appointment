import { UnprocessableEntityException } from '@nestjs/common';
import { BookingStatusEnum } from '../enums/booking-status.enum';

export type TimeSlotModelArgs = {
  id: string;
  doctorId: string;
  time: Date;
  status: BookingStatusEnum;
  patientId?: string | null;
  expiresAt?: Date | null;
};

export class TimeSlotModel {
  id: string;
  time: Date;
  status: BookingStatusEnum;
  patientId: string | null;
  doctorId: string;
  expiresAt: Date | null;

  private readonly reservedStatuses = [
    BookingStatusEnum.PREBOOKED,
    BookingStatusEnum.BOOKED,
  ];

  constructor(args: TimeSlotModelArgs) {
    this.id = args.id;
    this.time = args.time;
    this.status = args.status;
    this.patientId = args.patientId ?? null;
    this.doctorId = args.doctorId;
    this.expiresAt = args.expiresAt ?? null;
  }

  get isBooked() {
    return this.status === BookingStatusEnum.BOOKED;
  }

  get isPreBooked() {
    return this.status === BookingStatusEnum.PREBOOKED;
  }

  preBook(args: { patientId: string }): void {
    if (this.isBooked || this.isPreBooked) {
      throw new UnprocessableEntityException('Slot is not available');
    }

    this.status = BookingStatusEnum.PREBOOKED;
    this.patientId = args.patientId;
    this.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  }

  book(args: { patientId: string }): void {
    if (
      this.isBooked ||
      (this.isPreBooked && this.patientId !== args.patientId)
    ) {
      throw new UnprocessableEntityException('Slot is not available');
    }

    this.status = BookingStatusEnum.BOOKED;
    this.patientId = args.patientId;
    this.expiresAt = null;
  }

  expire(): void {
    if (this.reservedStatuses.includes(this.status)) {
      if (this.expiresAt && this.expiresAt < new Date()) {
        throw new UnprocessableEntityException('Unable to expire slot');
      }

      this.status = BookingStatusEnum.FREE;
      this.patientId = null;
      this.expiresAt = null;
    }
  }
}
