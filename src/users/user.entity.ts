import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { UserRole } from './user.interface';
import { PostEntity } from 'src/posts/post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100})
  name: string;
    
  @Column("varchar", { length: 50, unique: true })
  email: string;

  @Column("varchar")
  password: string;

  @Column({type : 'enum', enum: UserRole, default: UserRole.USER})
  role: UserRole

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
