import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, LoginModel } from "./auth.model";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: LoginDto): Promise<LoginModel> {
    return this.authService.login(loginDto);
  }
}
