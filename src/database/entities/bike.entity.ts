import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('bikes')
export class Bike {
  @PrimaryColumn()
  licensePlateNumber: string;

  @Column()
  mileage: number;

  @Column()
  brand: string;

  @Column({ default: true })
  isActive: boolean;
}
