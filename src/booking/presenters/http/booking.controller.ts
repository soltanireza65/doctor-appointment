import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingFacade } from '../../application/facades/booking.facade';
import { ListFreeSlotsRequestDto } from './dto/request/list-free-slots.request-dto';
import {
  PrebookSlotRequestDto,
  PrebookSlotRequestParamsDto,
} from './dto/request/prebook-slot.request-dto';
import {
  BookSlotRequestDto,
  BookSlotRequestParamsDto,
} from './dto/request/book-slot.request-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingFacade: BookingFacade) {}

  @Get(':doctorId/slots')
  listFreeSlots(@Param() dto: ListFreeSlotsRequestDto) {
    return this.bookingFacade.listFreeSlots(dto.toQuery());
  }

  @Post(':doctorId/prebook')
  async preBook(
    @Param() params: PrebookSlotRequestParamsDto,
    @Body() body: PrebookSlotRequestDto,
  ) {
    const success = await this.bookingFacade.preBook(
      body.toCommand(params.doctorId),
    );
    return { success };
  }

  @Post(':doctorId/book')
  async book(
    @Param() params: BookSlotRequestParamsDto,
    @Body() body: BookSlotRequestDto,
  ) {
    const success = await this.bookingFacade.book(
      body.toCommand(params.doctorId),
    );
    return { success };
  }
}
