import { Cookie, Public, UserAgent, CurrentUser } from '@common/decorators';
import { JwtPayload } from '@auth/interfaces';
import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
    UseInterceptors,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserResponse } from '@user/responses';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ChangePasswordDto } from './dto';
import { Tokens } from './interfaces';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

const REFRESH_TOKEN = 'refreshtoken';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body(new ValidationPipe()) dto: RegisterDto) {
        const user: User = await this.authService.register(dto);
        if (!user) {
            throw new BadRequestException(`Unable to register the user with the provided data ${JSON.stringify(dto)}`);
        }
        return new UserResponse(user);
    }

    @Post('login')
    async login(@Body(new ValidationPipe()) dto: LoginDto, @Res() res: Response, @UserAgent() agent: string) {
        const tokens = await this.authService.login(dto, agent);
        if (!tokens) {
            throw new BadRequestException(`Unable to log in with the provided credentials ${JSON.stringify(dto)}`);
        }
        this.setRefreshTokenToCookies(tokens, res);
    }

    @Get('logout')
    async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
        if (!refreshToken) {
            res.sendStatus(HttpStatus.OK);
            return;
        }
        await this.authService.deleteRefreshToken(refreshToken);
        res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
        res.sendStatus(HttpStatus.OK);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('changePassword')
    async changePassword(@Body(new ValidationPipe()) dto: ChangePasswordDto, @CurrentUser() CurrentUser: JwtPayload) {
        const user: User = await this.authService.changePassword(dto, CurrentUser.id);

        if (!user) {
            throw new UnauthorizedException('Unable to change password');
        }

        return new UserResponse(user);
    }

    private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
        if (!tokens) {
            throw new UnauthorizedException();
        }
        res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            secure: false,
            path: '/',
        });
        res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
}
