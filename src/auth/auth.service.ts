import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/users/user.interface';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {}

    

    login(email: string, password: string) {        
        return this.validateUser(email, password).then((user: User) => {
            // console.log(user);
            if (user) {
                return this.generateJWT(user);
            } else {
                throw new Error('User Invalid');
            }
        })
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    private validateUser(email: string, password: string): Promise<User> {        
        return this.findByEmail(email).then((user: User) => {
            if (!user) {
                return null;
            }
            return this.comparePasswords(password, user.password).then((match: boolean) => {
                if (match) {
                    const { password, ...rest } = user;
                    return rest;
                }
                throw new UnauthorizedException();
            })
        });
    }

    private findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({email: email});
    }

    private comparePasswords(password: string, passwordHash: string): Promise<any | boolean> {
        return bcrypt.compare(password, passwordHash);
    }    
    
    private generateJWT(user: User): string {
        return this.jwtService.sign(user);
    }    

}
