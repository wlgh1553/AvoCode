import { Public } from '@common/annotation/public.annotation';
import { ResponseDto } from '@common/response/response.format';
import { Body, Controller, Get, Patch, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { User } from '@user/entities/user.entity';
import { UserService } from '@user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
    return new ResponseDto(await this.userService.create(createUserDto));
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async update(@Body() updateUserDto: UpdateUserDto, @Request() request): Promise<ResponseDto<any>> {
    return new ResponseDto(await this.userService.update(updateUserDto, request));
  }

  @Get()
  async getInfo(@Request() request): Promise<ResponseDto<any>> {
    let user: User = await this.userService.findOne(request.user.id);
    return new ResponseDto(await this.userService.getInfo(request));
  }
}
