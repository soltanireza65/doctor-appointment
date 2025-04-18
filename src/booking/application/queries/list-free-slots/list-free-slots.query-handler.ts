import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListFreeSlotsQuery } from './list-free-slots.query';
import { TimeSlotRepository } from '../../ports/time-slot.repository';

@QueryHandler(ListFreeSlotsQuery)
export class ListFreeSlotsQueryHandler
  implements IQueryHandler<ListFreeSlotsQuery, any>
{
  constructor(private readonly timeSlotRepository: TimeSlotRepository) {}

  async execute(query: ListFreeSlotsQuery): Promise<any> {
    return this.timeSlotRepository.findAll({
      where: {
        doctorId: query.doctorId,
        status: 'FREE',
      },
    });
  }
}
