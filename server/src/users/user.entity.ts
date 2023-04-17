import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column('text', { array: true })
  messages: string[];

  @ApiProperty()
  @Column('text', { array: true })
  groups: string[];

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
