import { IsPasswordsMatchingConstraint } from '@common/decorators';
import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';

export class ChangePasswordDto {
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsString()
    @MinLength(6)
    @Validate(IsPasswordsMatchingConstraint)
    @IsNotEmpty()
    confirmPassword: string;
}
