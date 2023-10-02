// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsString, Matches, IsDefined, Length } from 'class-validator';

// Local Imports
import { ProductCategory } from "../product-category/product-category.entity";


/**
 * Category entity represents a category in the system.
 * It has relationships with ProductCategory entities.
 */
@Entity()
// @Entity({ name: 'your_table_name' })
export class Category {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;

    // -------------- Validation Fields --------------

    // NAME
    @Column({ length: 20, unique: true, nullable: false })
    @Length(3, 20)
    @IsDefined()
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le nom ne doit contenir que des lettres', })
    name: string;

    // -------------- Relations --------------

    @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
    productCategory: ProductCategory[]
}
