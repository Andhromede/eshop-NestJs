// Library Imports
import {
    IsBoolean,
    IsOptional,
    IsString,
    Matches,
    Length,
    IsEmail,
    IsInt,
    IsNotEmpty
} from 'class-validator';


/**
 * Client DTO represents a client model.
 * It has Login, Email, FirstName and LastName properties.
 */
export class GetClientDto {

    // ID
    @IsInt()
    @IsOptional()
    id?: number;

    // LOGIN
    @IsOptional()
    @Length(3, 50)
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Le login ne doit contenir que des lettres et des chiffres', })
    readonly login?: string;

    // EMAIL
    @IsOptional()
    @Length(5, 100)
    @IsEmail({}, { message: 'L\'adresse email n\'est pas valide' })
    readonly email?: string;

    // FIRST NAME
    @IsOptional()
    @Length(3, 50)
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le prénom ne doit contenir que des lettres', })
    readonly firstName?: string;

    // LAST NAME
    @IsOptional()
    @Length(3, 50)
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le nom ne doit contenir que des lettres', })
    readonly lastName?: string;

    @IsBoolean()
    @IsOptional()
    readonly isActive: boolean;

    @IsNotEmpty({ message: "L'ID du rôle est requis" })
    @IsOptional()
    roleId: number;
}
