import { Lecture } from '@lecture/entities/lecture.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class LectureRepository extends Repository<Lecture> {
  constructor(private dataSource: DataSource) {
    super(Lecture, dataSource.createEntityManager());
  }
}
