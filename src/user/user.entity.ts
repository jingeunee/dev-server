import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar2', default: '' })
  name: string;

  @Field({ defaultValue: '', nullable: true })
  @Column({ type: 'varchar2', nullable: true })
  email: string;

  @Column({ type: 'varchar2', nullable: true })
  provider: 'kakao'; // 카카오

  @Column({ type: 'varchar2', nullable: true })
  snsId: string;

  @Field({ defaultValue: '', nullable: true })
  @Column({ type: 'varchar2', nullable: true })
  image: string;

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  lastLoginDate: Date | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
