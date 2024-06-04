export enum UserType {
  DEFAULT_USER = 'USER',
  ADMINISTRATOR = 'ADMIN',
}

export enum SolvedResultType {
  RUNNING = 'RUNNING', //전송은 안 되도록
  ACCEPTED = 'ACCEPTED',
  WRONG = 'WRONG',
  COMPILATION_ERROR = 'COMPILATION_ERROR',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  EMPTY_TEST_CASE = 'EMPTY_TEST_CASE',
}

export enum LanguageType {
  C = 75,
  CPP = 76,
  PYTHON = 70,
  SQL = 82,
}

export enum CategoryList {
  NONE = 'NONE',
  C = 'C',
  ADVANCED_C = 'ADVANCED_C',
  DATA_STRUCTURE = 'DATA_STRUCTURE',
  ALGORITHM = 'ALGORITHM',
}

export enum TestCaseType {
  SAMPLE_TEST_CASE = 'SAMPLE',
  GRADING_TEST_CASE = 'GRADING',
}
