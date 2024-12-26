import { IsNotEmpty } from 'class-validator';

export class CreateCompleteDto {
  @IsNotEmpty()
  public lecture_id: number;

  @IsNotEmpty()
  public quiz_user_answer: number;
}
