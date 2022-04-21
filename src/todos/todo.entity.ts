import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  getRepository,
  Index,
  PrimaryGeneratedColumn,
  TreeLevelColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'long' })
  text: string;

  @Column({ type: 'char', length: 1, default: 'F', enum: ['F', 'T'] })
  isChecked: 'F' | 'T';

  @Column({ nullable: true })
  sortNo: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async beforeInsertAction() {
    const totalCount = await getRepository(Todo).count();
    this.sortNo = totalCount + 1;
  }
}
