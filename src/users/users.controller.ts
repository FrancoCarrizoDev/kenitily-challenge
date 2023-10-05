import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { ParseUserPipe } from 'src/pipes/parse-user.pipe';
import { customDiskStorage } from '../utilities/custom-disk-storage';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post(':id/photo-profile')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  uploadPhotoProfile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseObjectIdPipe) id: string,
  ) {
    return this.usersService.uploadPhotoProfile(id, file);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: customDiskStorage }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body(ParseUserPipe) bodyParsed: any,
  ) {
    const createUserDto = bodyParsed as CreateUserDto;
    return this.usersService.create(createUserDto);
  }
}
