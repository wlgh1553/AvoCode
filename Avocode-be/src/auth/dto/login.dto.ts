import { PickType } from '@nestjs/mapped-types';
import { User } from '@user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class LoginDto extends PickType(User, ['id', 'password']) {
  @IsNotEmpty()
  public id: string;

  @IsNotEmpty()
  public password: string;
}
