import { Injectable, ConflictException } from '@nestjs/common';

import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetByDocumentParams } from './params/get-by-document.params';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(dto: CreateUserDto) {
    return this.getByDocument({ document: `${dto.document}` }).pipe(
      switchMap(user =>
        user
          ? throwError(new ConflictException())
          : this.usersRepository.create({ ...dto }),
      ),
    );
  }

  getByDocument(params: GetByDocumentParams) {
    return this.usersRepository.getByDocument(Number(params.document));
  }
}
