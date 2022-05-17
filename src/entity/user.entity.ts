import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '이메일', type: 'char', length: 255 })
  email: string;

  @Column({ comment: '비밀번호', type: 'char', length: 255 })
  password: string;

  @Column({ comment: '이름', type: 'char', length: 255 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
