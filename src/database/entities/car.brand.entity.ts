import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ModelEntity } from './car.models.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.BRAND)
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ModelEntity, (model) => model.brand)
  models: ModelEntity[];
}
