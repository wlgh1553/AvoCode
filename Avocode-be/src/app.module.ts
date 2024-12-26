import { AuthModule } from '@auth/auth.module';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { CategoryModule } from '@category/category.module';
import { Category } from '@category/entities/category.entity';
import { ChapterModule } from '@chapter/chapter.module';
import { Chapter } from '@chapter/entities/chapter.entity';
import { TransformInterceptor } from '@common/response/response.interceptor';
import { CompletedLectureModule } from '@completedLecture/completed-lecture.module';
import { CompletedLecture } from '@completedLecture/entity/completed-lecture.entity';
import { Lecture } from '@lecture/entities/lecture.entity';
import { LectureModule } from '@lecture/lecture.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from '@problem/entities/problem.entity';
import { ProblemModule } from '@problem/problem.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { Submission } from '@submission/entities/submission.entity';
import { SubmissionModule } from '@submission/submission.module';
import { Testcase } from '@testcase/entities/testcase.entity';
import { TestcaseModule } from '@testcase/testcase.module';
import { User } from '@user/entities/user.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      autoLoadEntities: true,
      entities: [
        User,
        Problem,
        Category,
        Testcase,
        Chapter,
        Lecture,
        Submission,
        CompletedLecture,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    ProblemModule,
    SubmissionModule,
    TestcaseModule,
    ChapterModule,
    LectureModule,
    CompletedLectureModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
