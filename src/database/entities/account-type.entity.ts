import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AccountType } from './enums/account-type.enum';
import { TableNameEnum } from './enums/table-name.enum';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ACCOUNTS)
export class AccountTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AccountType,
    unique: true,
  })
  name: AccountType;

  @Column()
  description: string;

  @OneToMany(() => UserEntity, (user) => user.accountType)
  user: UserEntity[];
}
