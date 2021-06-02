import { User } from "src/users/user.interface";
import { PostTypeEntity } from "./post-type/post-type.entity";

export interface Article {
    id?: number;
    title?: string;
    body?: string;
    user?: User;
    postType?: PostTypeEntity[];
}