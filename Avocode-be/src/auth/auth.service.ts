import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/entities/user.entity';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.tryLogin(id, password);

    if (user instanceof User) {
      const { ...result } = user;

      return result;
    }

    throw user;
  }

  public async login(loginDto: any): Promise<any> {
    const id: string = loginDto.id;
    const password: string = loginDto.password;

    const result = await this.validateUser(id, password);

    if (result instanceof HttpException) throw result;

    return { access_token: this.jwtService.sign({ id, password }) };
  }
}
