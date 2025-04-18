import { Injectable, NotFoundException } from '@nestjs/common';
import {
  InvoiceWhereInput,
  TimeSlotRepository,
} from 'src/booking/application/ports/time-slot.repository';
import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';
import { DatabaseService } from 'src/database/database.service';
import {
  FindOption,
  FindAndPaginateOption,
  Paginated,
} from 'src/shared/types/repository.type';
import { TimeSlotPrismaEntity } from '../entities/time-slot.entity';
import { TimeSlotMapper } from '../mappers/time-slot.mapper';

@Injectable()
export class TimeSlotPrismaRepository implements TimeSlotRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  save(data: TimeSlotModel[]): Promise<TimeSlotModel[]>;
  save(data: TimeSlotModel): Promise<TimeSlotModel>;
  async save(
    data: TimeSlotModel[] | TimeSlotModel,
  ): Promise<TimeSlotModel[] | TimeSlotModel> {
    if (Array.isArray(data)) {
      const entityPromises: Promise<TimeSlotPrismaEntity>[] = [];

      for (const model of data) {
        const mapped = TimeSlotMapper.toPersistence(model);

        entityPromises.push(
          this.databaseService.timeSlot.upsert({
            create: mapped,
            update: mapped,
            where: {
              id: mapped.id,
            },
          }),
        );
      }

      const entities = await Promise.all(entityPromises);
      return entities.map((entity) => {
        return TimeSlotMapper.toDomain(entity as TimeSlotPrismaEntity);
      });
    }

    const mapped = TimeSlotMapper.toPersistence(data);

    const entity = await this.databaseService.timeSlot.upsert({
      create: mapped,
      update: mapped,
      where: {
        id: mapped.id,
      },
    });

    return TimeSlotMapper.toDomain(entity);
  }

  async findOne(
    options: FindOption<InvoiceWhereInput>,
  ): Promise<TimeSlotModel | null> {
    const entity = await this.databaseService.timeSlot.findFirst({
      where: { ...(options.where ?? {}) },
    });

    if (!entity) {
      return null;
    }

    return TimeSlotMapper.toDomain(entity);
  }

  async findOneOrFail(
    options: FindOption<InvoiceWhereInput>,
  ): Promise<TimeSlotModel> {
    const entity = await this.findOne(options);

    if (!entity) {
      throw new NotFoundException('Time Slot not found');
    }

    return entity;
  }

  async findAll(
    options: FindAndPaginateOption<InvoiceWhereInput>,
  ): Promise<Paginated<TimeSlotModel>> {
    const { page, take, orderBy } = options;

    const entityList = await this.databaseService.timeSlot.findMany({
      where: { ...(options.where ?? {}) },
      ...(take && { take: take }),
      ...(page && { skip: (page - 1) * (take ?? 0) }),
      orderBy,
    });

    const mapped = entityList?.map((entity) => {
      return TimeSlotMapper.toDomain(entity);
    });

    const totalItems = await this.count(options);

    return {
      items: mapped,
      total: totalItems,
    };
  }

  async exists(options: FindOption<InvoiceWhereInput>): Promise<boolean> {
    const count = await this.databaseService.timeSlot.count({
      where: options.where,
    });
    return Boolean(count);
  }

  async count(options: FindOption<InvoiceWhereInput>): Promise<number> {
    const count = await this.databaseService.timeSlot.count({
      where: {
        ...(options.where ?? {}),
      },
    });
    return count;
  }

  async delete(options: FindOption<InvoiceWhereInput>): Promise<void> {
    await this.databaseService.timeSlot.deleteMany({
      where: options.where,
    });
  }

  async update(
    options: FindOption<InvoiceWhereInput>,
    data: Partial<TimeSlotModel>,
  ): Promise<void> {
    await this.databaseService.timeSlot.updateMany({
      where: options.where,
      data: data as object,
    });
  }
}
