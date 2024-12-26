import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CompletedLecture } from './entity/completed-lecture.entity';

@Injectable()
export class CompletedLectureRepository extends Repository<CompletedLecture> {
  constructor(private dataSource: DataSource) {
    super(CompletedLecture, dataSource.createEntityManager());
  }
}
