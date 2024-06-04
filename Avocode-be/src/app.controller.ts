import { Public } from '@common/annotation/public.annotation';
import { Controller, Get } from '@nestjs/common';
import { AppService } from '@root/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  ) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
