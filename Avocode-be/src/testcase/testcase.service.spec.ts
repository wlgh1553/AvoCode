import { Test, TestingModule } from '@nestjs/testing';
import { TestcaseService } from '@testcase/testcase.service';

describe('TestcaseService', () => {
  let service: TestcaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestcaseService],
    }).compile();

    service = module.get<TestcaseService>(TestcaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
