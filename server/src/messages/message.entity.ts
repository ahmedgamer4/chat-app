import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../groups/group.entity';
import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  content: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  username: string;

  @ApiProperty()
  @Column({
    type: 'date',
  })
  date: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user: User) => user.messages, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ApiProperty()
  @ManyToOne(() => Group, (group: Group) => group.messages, {
    onDelete: 'CASCADE',
  })
  group: Group;
}
