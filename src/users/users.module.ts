import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 👈 THIS registers User
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    TypeOrmModule, // 👈 THIS allows other modules to use User
    UsersService,
  ],
})
export class UsersModule {}
