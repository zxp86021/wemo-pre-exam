import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateBikeDto {
  @ApiProperty()
  @IsNotEmpty()
  licensePlateNumber: string;

  @ApiProperty({
    minimum: 0,
    default: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  mileage: number;

  @ApiProperty()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    default: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
