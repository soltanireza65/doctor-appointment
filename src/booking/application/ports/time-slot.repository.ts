import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';
import {
  FindAndPaginateOption,
  FindOption,
  Paginated,
  TimeStamps,
  WhereInput,
} from 'src/shared/repository.type';

type InvoiceWhereInputBase = {
  id?: string;
  doctorId?: string;
  patientId?: string;
  status?: 'FREE' | 'BOOKED' | 'PREBOOKED';
  time?: Date;
};

export type InvoiceWhereInput = WhereInput<InvoiceWhereInputBase>;

export abstract class TimeSlotRepository {
  abstract save(data: TimeSlotModel[]): Promise<TimeSlotModel[]>;
  abstract save(data: TimeSlotModel): Promise<TimeSlotModel>;
  abstract findOne(
    options: FindOption<InvoiceWhereInput>,
  ): Promise<TimeSlotModel | null>;
  abstract findOneOrFail(
    options: FindOption<InvoiceWhereInput>,
  ): Promise<TimeSlotModel>;
  abstract findAll(
    options: FindAndPaginateOption<InvoiceWhereInput>,
  ): Promise<Paginated<TimeSlotModel>>;
  abstract exists(options: FindOption<InvoiceWhereInput>): Promise<boolean>;
  abstract count(options: FindOption<InvoiceWhereInput>): Promise<number>;
  abstract delete(options: FindOption<InvoiceWhereInput>): Promise<void>;
  abstract update(
    options: FindOption<InvoiceWhereInput>,
    data: Partial<TimeSlotModel>,
  ): Promise<void>;
}
