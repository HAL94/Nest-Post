import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { PostTypeEntity } from "./post-type.entity";
import { PostTypeService } from "./post-type.service";

@Controller('post-type')

export class PostTypeController {
    constructor(private readonly postTypeService: PostTypeService) {}

    @Post()
    async addPostType(@Body('post-type') postType: PostTypeEntity) {
        const res = await this.postTypeService.addPostType(postType);
        console.log('PostTypeController', res);
        return res;
    }

    @Delete(':postTypeId')
    async deletePostType(@Param('postTypeId') postTypeId: string) {
        const res = await this.postTypeService.deletePostType(postTypeId);
        console.log('PostTypeController', res);
        return res;
    }
}