import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../post.entity";

@Entity('postTypes')
export class PostTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  postType: string;

  //   @OneToMany(() => PostEntity, post => post.postTypes)
  //   post: PostEntity;

  @ManyToMany(() => PostEntity, post => post.postType)
  post: PostEntity;


 
}