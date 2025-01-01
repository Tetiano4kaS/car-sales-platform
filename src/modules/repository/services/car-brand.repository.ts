import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandEntity } from '../../../database/entities/car.brand.entity';

@Injectable()
export class CarBrandRepository extends Repository<BrandEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandEntity, dataSource.manager);
  }
}
