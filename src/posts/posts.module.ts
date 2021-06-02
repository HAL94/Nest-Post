import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTypeController } from './post-type/post-type.controller';
import { PostTypeEntity } from './post-type/post-type.entity';
import { PostTypeService } from './post-type/post-type.service';
import { PostEntity } from './post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostEntity, PostTypeEntity])
    ],
    controllers: [PostsController, PostTypeController],
    providers: [PostsService, PostTypeService]
})
export class PostsModule {}
