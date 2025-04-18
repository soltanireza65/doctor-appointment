import { Injectable, Logger } from '@nestjs/common';
import { TimeSlot } from './time-slot.interface';
import { BookingStatus } from './booking-status.enum';

@Injectable()
export class BookingService {
  private doctorSlots = new Map<string, TimeSlot[]>();
  private readonly logger: Logger = new Logger(BookingService.name);

  constructor() {
    this.doctorSlots.set('1', [
      {
        time: '09:00',
        status: BookingStatus.FREE,
      },
      {
        time: '09:30',
        status: BookingStatus.FREE,
      },
      {
        time: '10:00',
        status: BookingStatus.FREE,
      },
      {
        time: '10:30',
        status: BookingStatus.FREE,
      },
    ]);
  }

  initSlots(doctorId: string, slots: string[]) {
    this.doctorSlots.set(
      doctorId,
      slots.map((time) => ({
        time,
        status: BookingStatus.FREE,
      })),
    );

    this.logger.log('init', this.doctorSlots);
  }

  listFreeSlots(doctorId: string): TimeSlot[] {
    console.log(
      '🚀 ~ BookingService ~ listFreeSlots ~ this.doctorSlots:',
      this.doctorSlots,
    );
    console.log(
      '🚀 ~ BookingService ~ listFreeSlots ~ this.doctorSlots:',
      this.doctorSlots.get(doctorId),
    );
    // this.cleanupExpiredPreBookings(doctorId);
    return (
      this.doctorSlots
        .get(doctorId)
        ?.filter((slot) => slot.status === BookingStatus.FREE) ?? []
    );
  }

  preBook(doctorId: string, time: string, patientId: string): boolean {
    const slots = this.doctorSlots.get(doctorId);
    const slot = slots?.find((s) => s.time === time);

    if (!slot || slot.status !== BookingStatus.FREE) return false;

    slot.status = BookingStatus.PREBOOKED;
    slot.patientId = patientId;
    slot.expiresAt = Date.now() + 5 * 60 * 1000; // expires in 5 mins
    return true;
  }

  book(doctorId: string, time: string, patientId: string): boolean {
    const slots = this.doctorSlots.get(doctorId);
    const slot = slots?.find((s) => s.time === time);

    if (!slot) return false;

    // Check if already booked
    if (slot.status === BookingStatus.BOOKED) return false;

    // Check if pre-booked by this patient or still free
    if (
      slot.status === BookingStatus.FREE ||
      (slot.status === BookingStatus.PREBOOKED && slot.patientId === patientId)
    ) {
      slot.status = BookingStatus.BOOKED;
      slot.patientId = patientId;
      delete slot.expiresAt;
      return true;
    }

    return false;
  }

  private cleanupExpiredPreBookings(doctorId: string) {
    const slots = this.doctorSlots.get(doctorId);
    if (!slots) return;

    const now = Date.now();
    for (const slot of slots) {
      if (
        slot.status === BookingStatus.PREBOOKED &&
        slot.expiresAt &&
        now > slot.expiresAt
      ) {
        slot.status = BookingStatus.FREE;
        delete slot.patientId;
        delete slot.expiresAt;
      }
    }
  }
}
