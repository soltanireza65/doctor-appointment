import { BookingStatus } from './booking-status.enum';

// time-slot.interface.ts
export interface TimeSlot {
  time: string; // ISO string or HH:mm format
  status: BookingStatus;
  patientId?: string; // For prebook/book tracking
  expiresAt?: number; // Timestamp for pre-book expiry
}
