import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Subject } from 'rxjs';

import { User } from '@angular-nest/data';
import { UserCollectionName, UserDocument } from './users.schema';

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

  getByDocument(document: number) {
    const subject = new Subject<UserDocument>();
    const query: Partial<User> = { document };

    this.userModel.findOne(query, (err, res) => {
      subject.next(res);
      subject.complete();
    });

    return subject.asObservable();
  }
}
