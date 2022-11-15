import { PartialType } from '@nestjs/mapped-types';
import { CreateProductionorderDto } from './create-productionorder.dto';

export class UpdateProductionorderDto extends PartialType(CreateProductionorderDto) {}
