import { Test, TestingModule } from '@nestjs/testing';
import { CompletedLectureService } from './completed-lecture.service';

describe('CompletedLectureService', () => {
  let service: CompletedLectureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedLectureService],
    }).compile();

    service = module.get<CompletedLectureService>(CompletedLectureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
