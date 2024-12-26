import { ErrorType } from '@common/response/error.response';
import { CompletedLectureRepository } from '@completedLecture/completed-lecture.repository';
import { CompletedLecture } from '@completedLecture/entity/completed-lecture.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { Lecture } from './entities/lecture.entity';
import { LectureRepository } from './lecture.repository';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(CompletedLectureRepository)
    private completedLectureRepository: CompletedLectureRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(LectureRepository)
    private lectureRepository: LectureRepository,
  ) {}

  public findOne(id: number) {
    return this.lectureRepository.findOne({ where: { id } });
  }

  public async complete(
    id: string,
    lecture_id: number,
    quiz_user_answer: number,
  ) {
    const user: User = await this.userRepository.findOne({ where: { id: id } });
    const lecture: Lecture = await this.lectureRepository.findOne({
      where: { id: lecture_id },
    });

    if (!user) {
      throw ErrorType.USER_NOT_FOUND();
    }

    if (!lecture) {
      throw ErrorType.LECTURE_NOT_FOUND();
    }

    if (lecture.quiz_answer !== quiz_user_answer) {
      return {
        quiz_result: 'fail',
      };
    }

    const completedLecture: CompletedLecture =
      this.completedLectureRepository.create({ user: user, lecture: lecture });

    await this.completedLectureRepository.save(completedLecture);

    return {
      quiz_result: 'success',
    };
  }
}
