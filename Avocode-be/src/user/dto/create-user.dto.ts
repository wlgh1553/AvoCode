import { OmitType } from '@nestjs/swagger';
import { User } from '@user/entities/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto extends OmitType(User, ['experience']) {
  @IsNotEmpty()
  public id: string;

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public password: string;
}
