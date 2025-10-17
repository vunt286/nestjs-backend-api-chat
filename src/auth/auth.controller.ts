import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        const result = this.authService.login(body.username, body.password);
        if (!result) {
            throw new UnauthorizedException();
        }

        return result;
    }
    
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.username, dto.password, {
            displayName: dto.displayName,
            email: dto.email,
        });
    }

    @Post('login2')
    async login2(@Body() dto: LoginDto) {
        return this.authService.login(dto.username, dto.password);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @Roles('user')
    profile() {
        return 'demo profile';
    }

    @Get('role')
    roles() {
        return [
            { id: 1, roleName: 'role 1' },
            { id: 1, roleName: 'role 1' },
            { id: 1, roleName: 'role 1' },
            { id: 1, roleName: 'role 1' },
            { id: 1, roleName: 'role 1' },
            { id: 1, roleName: 'role 1' },
            { id: 1, roleName: 'role 1' },
        ];
    }
}