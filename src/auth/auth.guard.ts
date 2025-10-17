import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException();
        }

        let userVerify;
        try {
            userVerify = await this.jwtService.verifyAsync(token);
            console.log("userVerifyuserVerifyuserVerify", userVerify);
            request.userLogin = userVerify;
        } catch (error) {
            throw new UnauthorizedException();
        }

        //get role from request
        const requiredRoles = this.reflector.get<string[]>('myRoles', context.getHandler());
        console.log(requiredRoles, "requiredRolesrequiredRolesrequiredRoles");
        if (userVerify && !requiredRoles.includes(userVerify.role)) {
            throw new ForbiddenException();
        }

        return true;

    }
}