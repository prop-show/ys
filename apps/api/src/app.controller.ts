import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHello2() {
    throw new Error('故意的错误');
    // return { data: 'Hello 你好', extra: { page: 1, total: 100, pageSize: 10 } };
  }
}
