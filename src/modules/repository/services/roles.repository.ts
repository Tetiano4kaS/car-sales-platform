import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RoleEntity } from '../../../database/entities/roles.entity';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.manager);
  }
}
