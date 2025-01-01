import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ROLES)
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  user?: UserEntity[];
}
