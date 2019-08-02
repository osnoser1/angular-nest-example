import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost`, {
      dbName: 'angular-nest',
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
