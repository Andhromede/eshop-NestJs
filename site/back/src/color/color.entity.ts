// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsString, Matches, IsDefined, Length } from 'class-validator';

// Local Imports
import { ProductColor } from "../product-color/product-color.entity";


/**
 * Color entity represents a color in the system.
 * It has relationships with ProductColor entities.
 */
@Entity()
export class Color {

    // -------------- Attributes --------------
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;

    // -------------- Validation Fields --------------

    // NAME
    @Column({ length: 50, unique: true, nullable: false })
    @Length(3, 50)
    @IsDefined()
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le nom ne doit contenir que des lettres', })
    name: string;

    // -------------- Relations --------------

    @OneToMany(() => ProductColor, (productColor) => productColor.color)
    productColors: ProductColor[]
}
