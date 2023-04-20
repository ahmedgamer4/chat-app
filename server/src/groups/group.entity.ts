import { ApiProperty } from '@nestjs/swagger';
import type { Message } from '../messages/message.entity';
import type { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity('group')
export class Group {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty()
  @OneToMany('Message', 'group')
  messages: Relation<Message[]>;

  @ApiProperty()
  @ManyToMany('User', 'groups')
  users: Relation<User[]>;
}
