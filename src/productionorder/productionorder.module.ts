import { Module } from '@nestjs/common';
import { ProductionorderService } from './productionorder.service';
import { ProductionorderController } from './productionorder.controller';

@Module({
  controllers: [ProductionorderController],
  providers: [ProductionorderService]
})
export class ProductionorderModule {}
