import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { options } from './config';
import { GUARDS } from './guargs';
import { STRTAGIES } from './strategies';

@Module({
    controllers: [AuthController],
    providers: [AuthService, ...STRTAGIES, ...GUARDS],
    imports: [JwtModule.registerAsync(options()), UserModule],
})
export class AuthModule {}
