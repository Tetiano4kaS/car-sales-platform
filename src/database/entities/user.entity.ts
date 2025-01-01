import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccountTypeEntity } from './account-type.entity';
import { AdEntity } from './advertisement.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { RefreshTokenEntity } from './refresh-token.entity';
import { ReportEntity } from './report.entity';
import { RoleEntity } from './roles.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshToken?: RefreshTokenEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.user, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles?: RoleEntity[];

  @ManyToOne(() => AccountTypeEntity, (accountType) => accountType.user, {
    eager: true,
  })
  @JoinColumn({ name: 'accountTypeId' })
  accountType: AccountTypeEntity;

  @OneToMany(() => AdEntity, (ad) => ad.user)
  ads: AdEntity[];

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];
}
