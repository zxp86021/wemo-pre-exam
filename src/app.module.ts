import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikesController } from './bikes/bikes.controller';
import { BikesService } from './bikes/bikes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController, BikesController],
  providers: [AppService, BikesService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
