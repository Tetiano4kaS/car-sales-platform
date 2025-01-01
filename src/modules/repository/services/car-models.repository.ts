import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ModelEntity } from '../../../database/entities/car.models.entity';

@Injectable()
export class CarModelsRepository extends Repository<ModelEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelEntity, dataSource.manager);
  }
}
