import {
  BadRequestException,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';

export class ErrorType {
  public static USER_NOT_FOUND = () => {
    return new NotFoundException('해당 아이디를 가진 유저를 찾을 수 없습니다!');
  };
  public static INCORRECT_PASSWORD = () => {
    return new NotAcceptableException('올바르지 않은 비밀번호입니다!');
  };

  public static PROBLEM_NOT_FOUND = () => {
    return new NotFoundException('해당 문제를 찾을 수 없습니다!');
  };
  public static CATEGORY_NOT_FOUND = () => {
    return new NotFoundException('해당 카테고리를 찾을 수 없습니다!');
  };

  public static ID_DUPLICATE = () => {
    return new NotAcceptableException('해당 아이디를 가진 유저가 존재합니다!');
  };

  public static FORBIDDEN_ACCESS = () => {
    return new BadRequestException('접근 권한이 없습니다!');
  };

  public static SUBMISSION_NOT_FOUND = () => {
    return new NotFoundException('해당 제출을 찾을 수 없습니다!');
  };
}