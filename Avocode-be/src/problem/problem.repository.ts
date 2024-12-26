import { Injectable } from '@nestjs/common';
import { Problem } from '@problem/entities/problem.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProblemRepository extends Repository<Problem> {
  constructor(private dataSource: DataSource) {
    super(Problem, dataSource.createEntityManager());
  }
}
