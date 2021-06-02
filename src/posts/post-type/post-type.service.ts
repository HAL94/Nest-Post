import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostTypeEntity } from "./post-type.entity";


@Injectable()
export class PostTypeService {
    constructor(
        @InjectRepository(PostTypeEntity) private postTypeRepository: Repository<PostTypeEntity>
    ) {}

    addPostType(postType: PostTypeEntity) {
        return this.postTypeRepository.save(postType)
            .then((res) => res)
            .catch((error) => error);
    }

    deletePostType(postTypeId: string) {
        return this.postTypeRepository.delete(postTypeId)
            .then((res) => res)
            .catch(error => error);
    }
}