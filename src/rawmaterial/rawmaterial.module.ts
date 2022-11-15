import { Module } from '@nestjs/common';
import { RawmaterialService } from './rawmaterial.service';
import { RawmaterialController } from './rawmaterial.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RawmaterialController],
  providers: [RawmaterialService, PrismaService],
})
export class RawmaterialModule {}
