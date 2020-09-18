import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdateBikeDto {
  @ApiProperty({
    minimum: 0,
    default: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  mileage: number;

  @ApiProperty({
    default: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
