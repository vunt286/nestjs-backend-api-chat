import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/user.schema';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CacheModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UserModule { }
