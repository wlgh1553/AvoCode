export class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestException";
        this.statusCode = 400;
    }
}

export class InternalServerException extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerException";
        this.statusCode = 500;
    }
}

export const SESSION_NOT_FOUND_EXCEPTION = () =>
    new BadRequestException("존재하지 않는 session id입니다.");

export const INVALID_FILE_FORMAT_EXCEPTION = () =>
    new BadRequestException("잘못된 파일 포맷입니다.");

export const COMPILATION_FAILED_EXCEPTION = () =>
    new BadRequestException("컴파일 불가능한 코드입니다.");

export const BREAK_POINT_EXCEPTION = () =>
    new InternalServerException(
        "breakpoint 설정 과정에서 오류가 발생했습니다."
    );
