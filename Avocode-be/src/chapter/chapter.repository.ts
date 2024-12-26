import { Chapter } from '@chapter/entities/chapter.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ChapterRepository extends Repository<Chapter> {
  constructor(private dataSource: DataSource) {
    super(Chapter, dataSource.createEntityManager());
  }
}
