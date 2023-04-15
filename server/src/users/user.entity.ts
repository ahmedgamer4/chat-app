import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/* eslint-disable no-undef-init */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  passwordHash: string;

  @Column('text', { array: true })
  messages: string[];

  @Column('text', { array: true })
  groups: string[];

  @Column({
    type: 'text',
    nullable: true,
  })
  bio?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  photo?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  googleId?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  githubId?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  facebookId?: string;
}
