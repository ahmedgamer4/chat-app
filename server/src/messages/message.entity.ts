import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'int',
  })
  user_id: number;

  @Column({
    type: 'int',
  })
  group_id: number;
}
