import { Module } from '@nestjs/common';
import { BookingPrismaPersistenceModule } from './persistence/prisma/invoice-prisma-persistence.module';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class BookingInfrastructureModule {
  static use(driver: 'prisma' | 'typeorm') {
    const persistenceModule = this.resolvePersistenceModule(driver);

    return {
      module: BookingInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }

  private static resolvePersistenceModule(driver: 'prisma' | 'typeorm') {
    switch (driver) {
      case 'prisma':
        return BookingPrismaPersistenceModule;
      case 'typeorm':
        // return BookingTypeOrmPersistenceModule;
        throw new Error('TypeORM persistence module is not implemented yet.');
      default:
        return BookingPrismaPersistenceModule;
    }
  }
}
