import { ApiProperty } from '@nestjs/swagger';
import type { Group } from '../groups/group.entity';
import type { Message } from '../messages/message.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

/* eslint-disable no-undef-init */
@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  passwordHash: string;

  @ApiProperty()
  @OneToMany('Message', 'user')
  messages: Relation<Message[]>;

  @ApiProperty()
  @ManyToMany('Group', 'user')
  groups: Relation<Group[]>;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  bio?: string;

  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  photo?: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone?: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  googleId?: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  githubId?: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  facebookId?: string;
}
