import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost`, {
      dbName: 'angular-nest',
      user: environment.user,
      pass: environment.pass,
      // Prevent deprecation
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
