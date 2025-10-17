import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(username: string, password: string, extra: any = {}) {
        const existing = await this.userModel.findOne({ username });
        if (existing) throw new BadRequestException('Username already exists');

        const created = await this.userModel.create({
            username,
            password, // pre-save hook will hash
            ...extra,
        });

        return created;
    }

    async validateUser(username: string, password: string) {
        const user = await this.userModel.findOne({ username });
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Wrong password');
        return user;
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar
            },
        };
    }
}
