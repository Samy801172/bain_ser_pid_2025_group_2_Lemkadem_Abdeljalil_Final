import { ApiProperty } from "@nestjs/swagger";

export class SignInPayload {
  @ApiProperty()
  mail: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  googleHash?: string;

  @ApiProperty({ required: false })
  facebookHash?: string;

  @ApiProperty({ required: false, default: false })
  socialLogin?: boolean;
}