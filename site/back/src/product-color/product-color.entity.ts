// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsBoolean } from 'class-validator';

// Local Imports
import { Color } from "../color/color.entity";
import { Product } from "../product/product.entity";


/**
 * ProductColor entity represents a productcolor in the system.
 * It has relationships with Color and Product entities.
 */
@Entity()
export class ProductColor {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;

    // -------------- Relations --------------

    // @ManyToOne(() => Color, (color) => color.productColors, { eager: true, cascade: true })
    @ManyToOne(() => Color, (color) => color.productColors, { eager: true })
    @JoinColumn({ name: 'colorId' })
    color: Color;

    // @ManyToOne(() => Product, (product) => product.productColors, { eager: true, cascade: true })
    @ManyToOne(() => Product, (product) => product.productColors, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: Product;
}
