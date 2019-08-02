import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCollectionName, UserSchema } from './users.schema';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCollectionName,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersRepository, UsersService],
})
export class UsersModule {}
