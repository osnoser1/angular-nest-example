import { Injectable } from '@nestjs/common';

import { Todo } from '@angular-nest/data';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return ({ message: 'Welcome to api!' });
  }

  getTodos(): Todo[] {
    return [{ title: 'Fix my computer!' }, { title: 'Fix my desk' }];
  }
}
