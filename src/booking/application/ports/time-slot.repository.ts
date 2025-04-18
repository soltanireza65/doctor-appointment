import { BookingStatusEnum } from 'src/booking/domain/enums/booking-status.enum';
import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';
import {
  DateTimeFilter,
  FindAndPaginateOption,
  FindOption,
  Paginated,
  WhereInput,
} from 'src/shared/types/repository.type';

type InvoiceWhereInputBase = {
  id?: string;
  doctorId?: string;
  patientId?: string;
  status?: BookingStatusEnum;
  time?: Date;
  expiresAt?: DateTimeFilter | Date | string;
};

export type InvoiceWhereInput = WhereInput<InvoiceWhereInputBase>;

export abstract class TimeSlotRepository {
  abstract save(data: TimeSlotModel[]): Promise<TimeSlotModel[]>;
  abstract save(data: TimeSlotModel): Promise<TimeSlotModel>;
  abstract findOne(options: FindOption<InvoiceWhereInput>): Promise<TimeSlotModel | null>;
  abstract findOneOrFail(options: FindOption<InvoiceWhereInput>): Promise<TimeSlotModel>;
  abstract findAll(options: FindAndPaginateOption<InvoiceWhereInput>): Promise<Paginated<TimeSlotModel>>;
  abstract exists(options: FindOption<InvoiceWhereInput>): Promise<boolean>;
  abstract count(options: FindOption<InvoiceWhereInput>): Promise<number>;
  abstract delete(options: FindOption<InvoiceWhereInput>): Promise<void>;
  abstract update(options: FindOption<InvoiceWhereInput>, data: Partial<TimeSlotModel>): Promise<void>;
}
