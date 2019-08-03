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
import { differenceInMonths, startOfToday } from 'date-fns';

import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { GetByDocumentParams } from './params/get-by-document.params';
import { CreditRequest, CreditRequestResponse } from '@angular-nest/data';

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

  @Post('document/:document/credit-request') requestCreditByDocument(
    @Body() request: CreditRequest,
  ): CreditRequestResponse {
    if (differenceInMonths(startOfToday(), new Date(request.startDate))) {
      return { approved: false, reason: 'CREDIT_REQUEST_FORM.TIME' };
    }

    if (request.salary && request.salary < 800000) {
      return { approved: false, reason: 'CREDIT_REQUEST_FORM.SALARY_MSG' };
    }

    return {
      approved: true,
      amountApproved:
        request.salary >= 4000000
          ? 50000000
          : request.salary >= 1000000
          ? 20000000
          : 5000000,
    };
  }
}
