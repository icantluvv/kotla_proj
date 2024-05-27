import { IsString, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  Start_Time: string;

  @IsString()
  @IsNotEmpty()
  End_Time: string;
}
