import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';

import { UserCollectionName, UserDocument, User } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserCollectionName)
    private readonly userModel: Model<UserDocument>,
  ) {}

  create(newUser: User) {
    const createdUser = new this.userModel(newUser);
    return from(createdUser.save());
  }
}
