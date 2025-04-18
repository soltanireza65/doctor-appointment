import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { InitSlotsRequestDto } from './dto/request/init-slots.request-dto';
import { ListSlotsRequestDto } from './dto/request/list-slots.request-dto';
import { PrebookSlotRequestDto } from './dto/request/prebook-slot.request-dto';
import { BookSlotRequestDto } from './dto/request/book-slot.request-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('init')
  init(@Body() body: InitSlotsRequestDto): { success: boolean } {
    this.bookingService.initSlots(body.doctorId, body.slots);
    return { success: true };
  }

  @Get(':doctorId/slots')
  getSlots(@Param() dto: ListSlotsRequestDto) {
    return this.bookingService.listFreeSlots(dto.doctorId);
  }

  @Post(':doctorId/prebook')
  preBook(
    @Param('doctorId') doctorId: string,
    @Body() body: PrebookSlotRequestDto,
  ) {
    const success = this.bookingService.preBook(
      doctorId,
      body.time,
      body.patientId,
    );
    return { success };
  }

  @Post(':doctorId/book')
  book(@Param('doctorId') doctorId: string, @Body() body: BookSlotRequestDto) {
    const success = this.bookingService.book(
      doctorId,
      body.time,
      body.patientId,
    );
    return { success };
  }
}
