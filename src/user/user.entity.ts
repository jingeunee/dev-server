import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar2', default: '' })
  name: string;

  @Column({ type: 'varchar2', nullable: true })
  email: string;

  @Column({ type: 'varchar2', nullable: true })
  provider: 'kakao'; // 카카오

  @Column({ type: 'varchar2', nullable: true })
  snsId: string;

  @Column({ type: 'varchar2', nullable: true })
  image: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
