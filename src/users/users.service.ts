import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

interface IUserService {
  create(createUserDto: CreateUserDto): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<IUser>;
  uploadPhotoProfile(id: string, file: Express.Multer.File): string;
}

@Injectable()
export class UsersService implements IUserService {
  private logger = new Logger('UsersService');

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<IUser>) {}

  create(createUserDto: CreateUserDto) {
    this.logger.debug('Creating a new user');
    try {
      return this.userModel.create(createUserDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  findAll() {
    this.logger.debug('Finding all users');
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.logger.debug(`Updating user #${id}`);

    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });

      return user;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  uploadPhotoProfile(id: string, file: Express.Multer.File) {
    console.log(file);
    return `This action uploads a photo profile for user #${id}`;
  }
}
