import { ErrorType } from '@common/response/error.response';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { hash, verify } from 'argon2';
import { UserInfo, userInfo } from 'os';
import UserInfoDto from './dto/user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  public async create(createUserDto: CreateUserDto): Promise<any> {
    await this.checkUserExist(createUserDto);
    await this.userRepository.insert(this.userRepository.create(createUserDto));
  }

  public async update(updateUserDto: UpdateUserDto, request: any): Promise<UserInfoDto> {
    let user: User = await this.findOne(request.user.id);

    if (!user)
      throw ErrorType.USER_NOT_FOUND();

    if (updateUserDto.name)
      user.name = updateUserDto.name;

    if (updateUserDto.password)
      user.password = await hash(updateUserDto.password);

    this.userRepository.save(user);
    return new UserInfoDto(user);
  }

  public async getInfo(request: any) {
    let user: User = await this.findOne(request.user.id);

    if (!user)
      throw ErrorType.USER_NOT_FOUND();

    return new UserInfoDto(user);
  }

  public async tryLogin(
    id: string,
    password: string,
  ): Promise<User | NotFoundException | NotAcceptableException> {
    let user: User = await this.findOne(id);

    if (!user) throw ErrorType.USER_NOT_FOUND();

    let isPasswordCorrect = await verify(user.password, password);

    if (!isPasswordCorrect)
      throw ErrorType.INCORRECT_PASSWORD();

    return user;
  }

  public async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  public findOneByUuid(uuid: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { uuid: uuid } });
  }

  private async checkUserExist(userDto: any) {
    let id_duplicate: boolean = false;

    if (userDto.id)
      id_duplicate = await this.userRepository.exists({
        where: { id: userDto.id },
      });

    if (id_duplicate)
      throw ErrorType.ID_DUPLICATE();
  }
}
