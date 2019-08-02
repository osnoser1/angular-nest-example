import { IsNumberString } from 'class-validator';

export class GetByDocumentParams {
  @IsNumberString()
  document: number;
}
