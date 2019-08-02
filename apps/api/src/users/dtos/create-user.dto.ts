import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  document: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;
}
