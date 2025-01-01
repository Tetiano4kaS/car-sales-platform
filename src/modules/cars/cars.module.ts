import { Module } from '@nestjs/common';

import { Cars } from './services/cars.controller';
import { CarsService } from './services/cars.service';

@Module({
  controllers: [Cars],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
