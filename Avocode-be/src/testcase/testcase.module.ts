import { Module } from '@nestjs/common';
import { TestcaseController } from '@testcase/testcase.controller';
import { TestcaseRepository } from '@testcase/testcase.repository';
import { TestcaseService } from '@testcase/testcase.service';

@Module({
  controllers: [TestcaseController],
  providers: [TestcaseService, TestcaseRepository],
  exports: [TestcaseService],
})
export class TestcaseModule {}
