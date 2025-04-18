import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DoctorService {
  constructor(private readonly db: DatabaseService) {}

  create(createDoctorDto: CreateDoctorDto) {
    console.log("🚀 ~ DoctorService ~ create ~ createDoctorDto:", createDoctorDto)
    return this.db.doctor.create({
      data: {
        name: createDoctorDto.name,
      },
    });
  }

  findAll() {
    return this.db.doctor.findMany({});
  }
}
