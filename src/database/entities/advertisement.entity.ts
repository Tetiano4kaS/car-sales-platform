import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ADVERTISEMENT)
export class AdEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column('float')
  price: number;

  @Column()
  currency: string; // USD, EUR, UAH

  @Column()
  convertedPriceUSD: number;

  @Column()
  convertedPriceEUR: number;

  @Column()
  convertedPriceUAH: number;

  @Column({ default: 'draft' })
  status: 'draft' | 'active' | 'requires_edit' | 'inactive';

  @Column({ default: 0 })
  editAttempts: number;

  @ManyToOne(() => UserEntity, (user) => user.ads)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
