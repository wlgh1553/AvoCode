import { Test, TestingModule } from '@nestjs/testing';
import { TestcaseController } from '@testcase/testcase.controller';
import { TestcaseService } from '@testcase/testcase.service';

describe('TestcaseController', () => {
  let controller: TestcaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestcaseController],
      providers: [TestcaseService],
    }).compile();

    controller = module.get<TestcaseController>(TestcaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
