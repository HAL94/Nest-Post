import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Article } from './article.interface';
import { PostsService } from './posts.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/users/user.interface';

@Roles(UserRole.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}
    
    @Post()
    async addPost(@Body('post') post: Article, @Req() request) {
        console.log(request.user);
        post.user = request.user;
        const res = await this.postsService.addPost(post);
        console.log('PostsController: ', res);
        return res;
    }

    @Put(':postId')
    async updatePost(@Param('postId') postId: string, @Body('post') post: Article) {
        // post.user = request.user;
        post.id = +postId;
        const res = await this.postsService.updatePost(post);
        console.log(res);
        return res;
    }

    @Get()
    async getPosts(@Req() request) {
        const res = await this.postsService.getAllPosts();
        return res.map((post: Article) => ({...post, userId: request.user.id}));
        // return res;
    }

    @Delete(':postId')
    async deletePost(@Param('postId') postId: string) {
        const res = await this.postsService.deletePost(postId);
        return res;
    }

}
