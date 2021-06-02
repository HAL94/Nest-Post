import { Article } from "src/posts/article.interface";

export enum UserRole {
    ADMIN = 'Admin',
    EDITOR = 'Editor',
    USER = 'User'
}

export interface User {
    id?: number;
    name?: string;
    email: string;
    password?: string;
    role?: UserRole;
    posts?: Article[];
}