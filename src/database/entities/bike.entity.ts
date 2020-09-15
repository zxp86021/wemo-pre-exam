import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('bikes')
export class Bike {
  @PrimaryColumn()
  licensePlateNumber: string;

  @Column('decimal', { precision: 8, scale: 2, default: 0 })
  mileage: number;

  @Column()
  brand: string;

  @Column({ default: true })
  isActive: boolean;
}
