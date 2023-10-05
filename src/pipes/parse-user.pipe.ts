import { BadRequestException, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class ParseUserPipe implements PipeTransform {
  async transform(body: any): Promise<CreateUserDto> {
    const parseData = JSON.parse(body.data) as CreateUserDto;
    const createUserDto = plainToInstance(CreateUserDto, parseData);
    const validations = await validate(createUserDto);
    if (validations.length > 0) {
      throw new BadRequestException(validations);
    }
    return createUserDto;
  }
}
