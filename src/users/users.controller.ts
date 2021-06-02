import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

import { User } from "./user.interface";
import { UsersService } from "./users.service";

@Controller('users')

export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly authService: AuthService) {}

    @Get()
    async getUsers() {
        const result = await this.usersService.getUsers();
        return result.map((user: User) => {
           const {password, ...rest} = user;
           return rest;
        });
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: number) {
        return await this.usersService.getUser({id: userId});
    }

    // just a testing endpoint
    @Get(':userId/posts')
    async getUserPosts(@Param('userId') userId: number) {
        return await this.usersService.getUserPosts(userId);
    }

    @Post()
    async postUser(@Body('user') user: User) {        
        const res = await this.usersService.postUser(user);
        console.log('UsersController:', res);
        return res;
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return await this.authService.login(email, password).then((token: string) => ({
            token
        }), () => {
            return ({message: "invalid credentials or user not found"})
        });
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: number, @Body('user') user: User) {
        return await this.usersService.updateUser(userId, user);
    }

    @Delete(':userId')
    async deleteUser(@Param('userId') userId: number) {
        return await this.usersService.deleteUser(userId);
    }



}