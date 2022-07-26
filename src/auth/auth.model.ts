import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "../enums";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "max" })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "secret_key_123" })
  password: string;
}

export class LoginModel {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  })
  access_token: string;
}

export class TokenPayload {
  id: string;
  login: string;
  type: UserType;
}
