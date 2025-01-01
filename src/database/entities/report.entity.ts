import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REPORTS)
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column()
  userId: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
