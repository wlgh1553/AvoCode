import { AuthModule } from '@auth/auth.module';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { CategoryModule } from '@category/category.module';
import { CategoryService } from '@category/category.service';
import { Category } from '@category/entities/category.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from '@problem/entities/problem.entity';
import { ProblemModule } from '@problem/problem.module';
import { ProblemService } from '@problem/problem.service';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { SubmissionModule } from '@submission/submission.module';
import { Testcase } from '@testcase/entities/testcase.entity';
import { TestcaseModule } from '@testcase/testcase.module';
import { User } from '@user/entities/user.entity';
import { UserModule } from '@user/user.module';
import { UserService } from '@user/user.service';

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
      entities: [User, Problem, Category, Testcase],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    ProblemModule,
    SubmissionModule,
    TestcaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    ProblemService,
    CategoryService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
