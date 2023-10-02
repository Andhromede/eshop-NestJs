import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import validator from 'validator';


export function IsURL(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsURL',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return validator.isURL(value);
                }
            }
        });
    };
}
