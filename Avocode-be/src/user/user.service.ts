import { ErrorType } from '@common/response/error.response';
import { LectureRepository } from '@lecture/lecture.repository';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompletedLectureRepository } from '@root/completed-lecture/completed-lecture.repository';
import { CompletedLecture } from '@root/completed-lecture/entity/completed-lecture.entity';
import { SubmissionRepository } from '@submission/submission.repository';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update-user.dto';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { hash, verify } from 'argon2';
import UserInfoDto from './dto/user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(SubmissionRepository)
    private submissionRepository: SubmissionRepository,

    @InjectRepository(LectureRepository)
    private lectureRepository: LectureRepository,

    @InjectRepository(CompletedLectureRepository)
    private completedLectureRepository: CompletedLectureRepository,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<any> {
    await this.checkUserExist(createUserDto);
    await this.userRepository.insert(this.userRepository.create(createUserDto));
  }

  public async update(
    updateUserDto: UpdateUserDto,
    request: any,
  ): Promise<UserInfoDto> {
    const user: User = await this.findOne(request.user.id);

    if (!user) throw ErrorType.USER_NOT_FOUND();

    if (updateUserDto.name) user.name = updateUserDto.name;

    if (updateUserDto.password)
      user.password = await hash(updateUserDto.password);

    this.userRepository.save(user);
    return new UserInfoDto(user);
  }

  public async getInfo(request: any) {
    const user: User = await this.findOne(request.user.id);

    if (!user) throw ErrorType.USER_NOT_FOUND();

    return new UserInfoDto(user);
  }

  public async tryLogin(
    id: string,
    password: string,
  ): Promise<User | NotFoundException | NotAcceptableException> {
    const user: User = await this.findOne(id);

    if (!user) throw ErrorType.USER_NOT_FOUND();

    const isPasswordCorrect = await verify(user.password, password);

    if (!isPasswordCorrect) throw ErrorType.INCORRECT_PASSWORD();

    return user;
  }

  public async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  private async checkUserExist(userDto: any) {
    let id_duplicate: boolean = false;

    if (userDto.id)
      id_duplicate = await this.userRepository.exists({
        where: { id: userDto.id },
      });

    if (id_duplicate) throw ErrorType.ID_DUPLICATE();
  }

  public async isSolved(user_id: string, problem_id: number): Promise<boolean> {
    return await this.submissionRepository.exists({
      where: {
        user: { id: user_id },
        problem: { id: problem_id },
      },
    });
  }

  public async isCompleted(user_id: string, lecture_id: number): Promise<any> {
    const completedLecture: CompletedLecture =
      await this.completedLectureRepository.findOne({
        where: { user: { id: user_id }, lecture: { id: lecture_id } },
      });

    if (completedLecture) {
      const lecture_completed_at = completedLecture.created_at;
      return { result: true, completed_at: lecture_completed_at };
    }

    return { result: false };
  }
}
