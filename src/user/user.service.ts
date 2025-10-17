import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, '-password');
  }

  async findById(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async searchUsers(keyword: string): Promise<User[]> {
    const regex = new RegExp(keyword, 'i');
    return this.userModel.find(
      { username: { $regex: regex } },
      '-password',
    );
  }
}
