import { Injectable } from "@nestjs/common";
import { Submission } from "@submission/entities/submission.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SubmissionRepository extends Repository<Submission> {
    constructor(private dataSource: DataSource) {
        super(Submission, dataSource.createEntityManager());
    }
}