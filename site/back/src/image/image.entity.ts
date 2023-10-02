// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsBoolean, IsString, Matches, Length, IsDefined } from 'class-validator';

// Local Imports
import { Product } from "../product/product.entity";
import { IsURL } from '../helpers/IsUrlValidator'; 


/**
 * Image entity represents a image in the system.
 * It has relationships with Product entitie.
 */
@Entity()
export class Image {

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
    @Matches(/^[a-zA-Z0-9-_]+$/, { message: 'Le nom ne doit contenir que des lettres, des chiffres, des tirets ou des underscores', })
    name: string;

    // URL
    @Column({ length : 255, nullable: false })
    @Length(5, 255)
    @IsDefined()
    @IsString()
    @IsURL({ message: 'L\'url n\'est pas valide' })
    // @Matches(/^[a-zA-Z0-9-_:\/?=&#]+$/, { message: 'L\'url contient des caractères non autorisés', })
    url: string;

    // -------------- Relations --------------

    // @ManyToOne(() => Product, (product) => product.images, { eager: true, cascade: true })
    @ManyToOne(() => Product, (product) => product.images, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: Product;
}
