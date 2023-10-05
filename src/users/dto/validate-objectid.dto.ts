import { IsMongoId } from 'class-validator';

export class ValidateObjectIdDto {
  @IsMongoId()
  id: string;
}
