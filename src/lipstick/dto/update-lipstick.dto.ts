import { PartialType } from '@nestjs/swagger';
import { CreateLipstickDto } from './create-lipstick.dto';

export class UpdateLipstickDto extends PartialType(CreateLipstickDto) {}
