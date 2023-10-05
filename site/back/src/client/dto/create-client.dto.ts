// Library Imports
import { 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    Matches, 
    Length, 
    IsEmail, 
    IsBoolean 
} from 'class-validator';
  

/**
 * Client DTO represents a client model.
 * It has Login, Email, FirstName and LastName properties.
 */
  export class CreateClientDto {

    // LOGIN
    @Length(3, 50)
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Le login ne doit contenir que des lettres et des chiffres', })
    readonly login: string;
  
    // EMAIL
    @Length(5, 100)
    @IsEmail({}, { message: 'L\'adresse email n\'est pas valide' })
    readonly email: string;

    // PASSWORD
    @Length(5, 255)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#]{8,}$/,
        { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial, et doit avoir une longueur minimale de 8 caractères' }
    )
    password: string;
  
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
    isActive: boolean = true;

    @IsNotEmpty({ message: "L'ID du rôle est requis" })
    roleId: number;

  }
  