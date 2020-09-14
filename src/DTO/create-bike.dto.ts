import { ApiProperty } from '@nestjs/swagger';

export class CreateBikeDto {
  @ApiProperty()
  licensePlateNumber: string;

  @ApiProperty({
    minimum: 0,
    default: 0,
  })
  mileage: number;

  @ApiProperty()
  brand: string;

  @ApiProperty({
    default: true,
  })
  isActive: boolean;
}
