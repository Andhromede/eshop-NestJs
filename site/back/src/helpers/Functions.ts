import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export function IsTwoDecimal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsTwoDecimal',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'number' && /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
        defaultMessage(args: ValidationArguments) {
          return 'Le champ property doit avoir au maximum deux décimales.';
        }
      }
    });
  };
}

function RoundToTwoDecimals(price) {
    return parseFloat(price.toFixed(2));
}