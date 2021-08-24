import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppBaseEntity } from '../../../common/database/entities/app-base.entity';

@Entity({
  name: 'users',
})
export class User extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true, nullable: false, type: 'text' })
  email: string;

  @Column({ unique: true, nullable: false, type: 'text' })
  password: string;
}
