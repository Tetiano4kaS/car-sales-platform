import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BrandEntity } from './car.brand.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.MODELS)
export class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.models)
  brand: BrandEntity;
}
