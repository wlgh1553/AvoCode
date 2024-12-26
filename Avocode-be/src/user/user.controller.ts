import { Public } from '@common/annotation/public.annotation';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { UserService } from '@user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(createUserDto);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() request,
  ): Promise<any> {
    return await this.userService.update(updateUserDto, request);
  }

  @Get()
  async getInfo(@Request() request): Promise<any> {
    return await this.userService.getInfo(request);
  }
}
