import { RegisterDto } from '@auth/dto';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments) {
        const obj = args.object as RegisterDto;
        return obj.password === confirmPassword;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Passwords do not match';
    }
}
