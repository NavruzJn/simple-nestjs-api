import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users";
import { LoginDto } from "./auth.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findByLoginAndPassword(
      loginDto.login,
      loginDto.password
    );
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        login: user.login,
        type: user.type,
      }),
    };
  }
}
