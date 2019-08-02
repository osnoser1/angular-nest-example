import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { GetByDocumentParams } from './params/get-by-document.params';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get('document/:document') getByDocument(
    @Param() params: GetByDocumentParams,
  ) {
    if (!/^\d+$/.test(params.document)) {
      throw new NotFoundException();
    }

    return this.usersService
      .getByDocument(params)
      .pipe(
        switchMap(user =>
          !user ? throwError(new NotFoundException()) : of(user),
        ),
      );
  }
}
