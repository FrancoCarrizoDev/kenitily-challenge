import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
