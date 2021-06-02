import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate(payload: any) {
    // console.log('[JWT Strategy]', payload);
    return { ...payload };
  }
}