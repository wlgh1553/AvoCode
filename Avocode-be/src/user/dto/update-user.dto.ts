import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'password',
]) {
  @IsOptional()
  public name: string;

  @IsOptional()
  public password: string;
}
