import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListFreeSlotsQuery } from './list-free-slots.query';
import { TimeSlotRepository } from '../../ports/time-slot.repository';
import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';
import { Paginated } from 'src/shared/types/repository.type';

@QueryHandler(ListFreeSlotsQuery)
export class ListFreeSlotsQueryHandler
  implements IQueryHandler<ListFreeSlotsQuery, Paginated<TimeSlotModel>>
{
  constructor(private readonly timeSlotRepository: TimeSlotRepository) {}

  async execute(query: ListFreeSlotsQuery): Promise<Paginated<TimeSlotModel>> {
    return this.timeSlotRepository.findAll({
      where: {
        doctorId: query.doctorId,
        status: 'FREE',
      },
    });
  }
}
