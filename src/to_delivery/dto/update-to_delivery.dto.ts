import { PartialType } from '@nestjs/swagger';
import { CreateToDeliveryDto } from './create-to_delivery.dto';

export class UpdateToDeliveryDto extends PartialType(CreateToDeliveryDto) {}
