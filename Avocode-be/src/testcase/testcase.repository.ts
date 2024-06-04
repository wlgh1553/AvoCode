import { Injectable } from '@nestjs/common';
import { Testcase } from '@testcase/entities/testcase.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TestcaseRepository extends Repository<Testcase> {
  constructor(private dataSource: DataSource) {
    super(Testcase, dataSource.createEntityManager());
  }
}
