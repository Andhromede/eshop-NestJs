// Library Imports
import {
    IsString,
    Matches,
    Length,
    IsBoolean,
    IsDefined,
    IsInt,
    IsOptional
} from 'class-validator';


/**
 * Role DTO represents a role model.
 * It has Name and IsActive properties.
 */
export class GetRoleDto {

    // ID
    @IsInt()
    @IsOptional()
    id?: number;

    // NAME
    @IsOptional()
    @Length(3, 20)
    @IsDefined()
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le nom ne doit contenir que des lettres', })
    readonly name: string;

    @IsBoolean()
    @IsOptional()
    readonly isActive: boolean;

}
