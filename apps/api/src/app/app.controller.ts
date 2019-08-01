import { Controller, Get } from '@nestjs/common';

import { Todo } from '@angular-nest/data';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('todos')
  getTodos(): Todo[] {
    return this.appService.getTodos();
  }
}
