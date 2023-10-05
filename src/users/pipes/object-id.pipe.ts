import { BadRequestException, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateObjectIdDto } from '../dto/validate-objectid.dto';

export class ValidateObjectIdPipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    const objectToValidate = plainToClass(ValidateObjectIdDto, { id: value });
    const errors = await validate(objectToValidate);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }
}
