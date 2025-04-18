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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListTimeSlotResponseDto } from './dto/response/list-time-slot.response-dto';
import { OkResponse } from 'src/shared/dto/ok.response';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingFacade: BookingFacade) {}

  @ApiResponse({
    type: ListTimeSlotResponseDto,
    status: 200,
  })
  @Get(':doctorId/slots')
  async listFreeSlots(@Param() dto: ListFreeSlotsRequestDto) {
    const result = await this.bookingFacade.listFreeSlots(dto.toQuery());

    return ListTimeSlotResponseDto.from(result);
  }

  @ApiResponse({
    type: OkResponse,
    status: 201,
  })
  @Post(':doctorId/prebook')
  async preBook(
    @Param() params: PrebookSlotRequestParamsDto,
    @Body() body: PrebookSlotRequestDto,
  ) {
    await this.bookingFacade.preBook(body.toCommand(params.doctorId));
    return new OkResponse();
  }

  @ApiResponse({
    type: OkResponse,
    status: 201,
  })
  @Post(':doctorId/book')
  async book(
    @Param() params: BookSlotRequestParamsDto,
    @Body() body: BookSlotRequestDto,
  ) {
    await this.bookingFacade.book(body.toCommand(params.doctorId));
    return new OkResponse();
  }
}
