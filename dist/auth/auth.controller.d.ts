import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            _id: unknown;
            username: string;
            displayName: string | undefined;
            avatar: string | undefined;
        };
    }>;
    register(dto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").UserDocument, {}, {}> & import("./user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    login2(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            _id: unknown;
            username: string;
            displayName: string | undefined;
            avatar: string | undefined;
        };
    }>;
    profile(): string;
    roles(): {
        id: number;
        roleName: string;
    }[];
}
