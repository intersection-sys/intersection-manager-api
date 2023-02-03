import { PartialType } from '@nestjs/swagger';
import { CreateStockDestinyDto } from './create-stockdestiny.dto';

export class UpdateStockdestinyDto extends PartialType(CreateStockDestinyDto) {}
