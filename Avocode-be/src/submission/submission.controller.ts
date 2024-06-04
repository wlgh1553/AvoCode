import { ResponseDto } from '@common/response/response.format';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateSubmissionDto } from '@submission/dto/create-submission.dto';
import { SubmissionService } from '@submission/submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Request() req: any,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(
      await this.submissionService.create(req.user.id, createSubmissionDto),
    );
  }

  @Post('/sample')
  @UsePipes(ValidationPipe)
  async compile(
    @Request() req: any,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(
      await this.submissionService.sampleDataCompile(
        req.user.id,
        createSubmissionDto,
      ),
    );
  }

  @Get(':problem_id')
  async getAllSubmissionsByProblem(
    @Request() req: any,
    @Param('problem_id', ParseIntPipe) problemId: string,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(
      await this.submissionService.getSubmissionsByProblem(
        req.user.id,
        +problemId,
      ),
    );
  }

  @Get('/code/:submission_id')
  async getAllSubmissionsBySubmissionId(
    @Request() req: any,
    @Param('submission_id', ParseIntPipe) submissionId: string,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(
      await this.submissionService.findCodeWithAuthorityCheck(
        +submissionId,
        req.user.id,
      ),
    );
  }
}
