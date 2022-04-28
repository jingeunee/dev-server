import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Blog {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar2' })
  title: string;

  @Field(() => String)
  @Column({ type: 'long' })
  body: string;

  @Field(() => String)
  @Column({ type: 'varchar2' })
  thumbnail: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  userId: number;
}
