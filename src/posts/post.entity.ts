import { UserEntity } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostTypeEntity } from "./post-type/post-type.entity";

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 100 })
  body: string;
 
  @ManyToOne(() => UserEntity, user => user.posts)
  user: UserEntity;

  // @OneToOne(() => PostTypeEntity)
  // @JoinColumn()
  // postType: PostTypeEntity;

  @ManyToMany(() => PostTypeEntity, {cascade: true})
  @JoinTable()  
  postType: PostTypeEntity[];
}