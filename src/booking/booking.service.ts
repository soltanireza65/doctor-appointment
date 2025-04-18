import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private readonly db: DatabaseService) {}

  async initSlots(doctorId: string, timeStrings: string[]) {
    const doctor = await this.db.doctor.upsert({
      where: { id: doctorId },
      create: { id: doctorId, name: `Doctor ${doctorId}` },
      update: {},
    });

    const existing = await this.db.timeSlot.findMany({
      where: {
        doctorId,
        time: { in: timeStrings.map((t) => new Date(t)) },
      },
    });

    const existingTimes = new Set(existing.map((s) => s.time.toISOString()));

    const newSlots = timeStrings
      .map((t) => new Date(t))
      .filter((time) => !existingTimes.has(time.toISOString()))
      .map((time) => ({
        time,
        doctorId,
        status: 'FREE' as const,
      }));

    await this.db.timeSlot.createMany({
      data: newSlots,
    });

    return { added: newSlots.length };
  }

  async listFreeSlots(doctorId: string) {
    return this.db.timeSlot.findMany({
      where: {
        doctorId,
        status: 'FREE',
      },
      orderBy: { time: 'asc' },
    });
  }

  async preBook(doctorId: string, time: string, patientId: string) {
    const slot = await this.db.timeSlot.findFirst({
      where: { doctorId, time: new Date(time), status: 'FREE' },
    });

    if (!slot) return false;

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.db.timeSlot.update({
      where: { id: slot.id },
      data: {
        status: 'PREBOOKED',
        patientId,
        expiresAt,
      },
    });

    return true;
  }

  async book(doctorId: string, time: string, patientId: string) {
    const slot = await this.db.timeSlot.findFirst({
      where: {
        doctorId,
        time: new Date(time),
        OR: [{ status: 'FREE' }, { status: 'PREBOOKED', patientId }],
      },
    });

    if (!slot) return false;

    await this.db.timeSlot.update({
      where: { id: slot.id },
      data: {
        status: 'BOOKED',
        expiresAt: null,
      },
    });

    return true;
  }

  async expirePrebook(slotId: string) {
    const slot = await this.db.timeSlot.findUnique({ where: { id: slotId } });
    if (
      slot?.status === 'PREBOOKED' &&
      slot.expiresAt &&
      slot.expiresAt < new Date()
    ) {
      await this.db.timeSlot.update({
        where: { id: slotId },
        data: {
          status: 'FREE',
          patientId: null,
          expiresAt: null,
        },
      });
    }
  }
}
