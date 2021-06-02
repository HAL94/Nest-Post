import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.interface';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>        
    ) {}

    addPost(article: Article) {
        return this.postsRepository.save(article).then((res) => res).catch((error) => error);
    }  

    getAllPosts() {
        return this.postsRepository.find({relations: ['postType']})
            .then((res) => res)
            .catch((error) => error);
    }

    updatePost(post: Article) {
        return this.postsRepository.save(post)
            .then((res) => res)
            .catch(error => error);
    }

    deletePost(postId: string) {
        return this.postsRepository.delete(postId)
            .then((res) => res)
            .catch(error => error);
    }

    

    
    
}
