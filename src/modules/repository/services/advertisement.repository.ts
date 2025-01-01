import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdEntity } from '../../../database/entities/advertisement.entity';

@Injectable()
export class AdvertisementRepository extends Repository<AdEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdEntity, dataSource.manager);
  }
}
