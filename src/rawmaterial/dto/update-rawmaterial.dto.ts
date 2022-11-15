import { PartialType } from '@nestjs/mapped-types';
import { CreateRawMaterialDto } from './create-rawmaterial.dto';

export class UpdateRawmaterialDto extends PartialType(CreateRawMaterialDto) {}
