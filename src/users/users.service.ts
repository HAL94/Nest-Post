import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getConnection, Repository, UpdateResult } from "typeorm";
import { catchError, map, switchMap } from 'rxjs/operators';

import { AuthService } from "src/auth/auth.service";
import { PostEntity } from "src/posts/post.entity";
import { UserEntity } from "./user.entity";
import { User } from "./user.interface";
import { from, throwError } from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private readonly authService: AuthService
    ) {}

    getUsers(): Promise<UserEntity[]> {
        return this.usersRepository.find().catch(error => error = error);
    }

    postUser(user: User): Promise<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {                
                return from(this.usersRepository.save({
                    ...user,
                    password: passwordHash
                })).pipe(
                    map((user: User) => {
                        const {password, ...rest} = user;
                        return rest;
                    }),
                    catchError(error => throwError(error))
                )
            })
        ).toPromise();
    }

    getUser(props: any): Promise<any|UserEntity> {
        const relations = {relations: ['posts', 'posts.postType']};
        return this.usersRepository.findOne(props, relations).then((user: User) => {
            const {password, ...rest} = user;
            return rest;
        })
        .catch(error => console.log(error));        
    }
    
    updateUser(userId: number, user: User): Promise<UpdateResult> {
        return this.usersRepository.update(userId, user);
    }
    
    deleteUser(userId: number): Promise<DeleteResult> {
        return this.usersRepository.delete(userId);
    }

    // testing and practicing the query builder
    getUserPosts(userId: number) {
        return getConnection()
            .getRepository(PostEntity)
            .createQueryBuilder()
            .select("posts")
            .from(PostEntity, "posts")
            .where("posts.userId = :id", {id: userId})
            .getMany();
    }

}