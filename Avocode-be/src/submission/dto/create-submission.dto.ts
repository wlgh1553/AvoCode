import { LanguageType } from '@common/enums';
import { PickType } from '@nestjs/mapped-types';
import { Submission } from '@submission/entities/submission.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateSubmissionDto extends PickType(Submission, [
  'code',
  'language',
]) {
  @IsNotEmpty()
  public problem_id: number;

  @IsNotEmpty()
  public code: string;

  @IsNotEmpty()
  public language: LanguageType;
}
