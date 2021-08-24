import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppBaseEntity } from '../../../common/database/entities/app-base.entity';
import { User } from '../../users/entities/user.entity';

@Entity({
  name: 'notes',
})
export class Notes extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  note_id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
