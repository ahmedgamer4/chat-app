import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @Column()
  messages: string[];

  @Column()
  groups: string[];

  @Column()
  bio?: string;

  @Column()
  photo?: string;

  @Column()
  email: string;

  @Column()
  phone?: string;

  @Column()
  googleId?: string;

  @Column()
  githubId?: string;

  @Column()
  facebookId?: string;
}
