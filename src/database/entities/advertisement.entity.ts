import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
  title: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column('float')
  price: number;

  @Column()
  currency: string; // USD, EUR, UAH

  @Column('float')
  convertedPriceUSD: number;

  @Column('float')
  convertedPriceEUR: number;

  @Column('float')
  convertedPriceUAH: number;

  @Column({ default: 'draft' })
  status: 'draft' | 'active' | 'requires_edit' | 'inactive';

  @Column({ default: 0 })
  editAttempts: number;

  @Column({ default: 0 })
  views: number;

  @Column('simple-json', { nullable: true })
  viewsByPeriod: {
    daily: number;
    weekly: number;
    monthly: number;
  };

  @Index()
  @Column()
  region: string;

  @ManyToOne(() => UserEntity, (user) => user.ads)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
