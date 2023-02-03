import { Module } from '@nestjs/common';
import { StockDestinyService } from './stockdestiny.service';
import { StockdestinyController } from './stockdestiny.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StockdestinyController],
  providers: [StockDestinyService, PrismaService],
})
export class StockdestinyModule {}
