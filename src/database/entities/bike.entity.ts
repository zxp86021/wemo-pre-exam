import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Bike {
  @PrimaryColumn()
  licensePlateNumber: string;

  @Column()
  mileage: number;

  @Column()
  brand: string;

  @Column()
  isActive: boolean;
}