// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsBoolean, IsString, Matches, Length, IsDefined, IsInt, Min, MinLength, MaxLength } from 'class-validator';

// Local Imports
import { IsTwoDecimal } from '../helpers/Functions';
import { ProductCategory } from "../product-category/product-category.entity";
import { ProductColor } from "../product-color/product-color.entity";
import { Image } from "../image/image.entity";
import { ProductPromotion } from "../product-promotion/product-promotion.entity";
import { OrderProduct } from "../order-product/order-product.entity";


/**
 * Product entity represents a product in the system.
 * It has relationships with ProductCategory, ProductColor, Image, ProductPromotion and OrderProduct entities.
 */
@Entity()
export class Product {

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

    // DESCRIPTION
    @Column('text')
    @MinLength(10, { message: 'La description doit contenir au moins 10 caractères.' }) 
    @MaxLength(1000, { message: 'La description peut contenir au maximum 1000 caractères.' })
    description: string;

    // SIZE
    @Column('int')
    @IsInt({ message: 'La taille doit être un entier.' })
    @Min(1, { message: 'La taille doit être supérieure ou égale à 1.' })
    size: number;

    // HEIGHT
    @Column('int')
    @IsInt({ message: 'La hauteur doit être un entier.' })
    @Min(1, { message: 'La hauteur doit être supérieure ou égale à 1.' })
    height: number;

    // WIDTH
    @Column('int')
    @IsInt({ message: 'La largeur doit être un entier.' })
    @Min(1, { message: 'La largeur doit être supérieure ou égale à 1.' })
    width: number;

    // LENGTH
    @Column('int')
    @IsInt({ message: 'La longueur doit être un entier.' })
    @Min(1, { message: 'La longueur doit être supérieure ou égale à 1.' })
    length: number;

    // WEIGHT
    @Column('int')
    @IsInt({ message: 'Le poids doit être un entier.' })
    @Min(1, { message: 'Le poids doit être supérieure ou égale à 1.' })
    weight: number;
    
    // PRICE
    @Column('decimal', { precision: 7, scale: 2 })
    @IsTwoDecimal({ message: 'Le prix doit avoir au maximum deux décimales.' })
    @Min(0.01, { message: 'Le prix doit être supérieure ou égale à 0.01.' })
    price: number;

    // -------------- Relations --------------

    // @ManyToOne(() => ProductCategory, (productCategory) => productCategory.category, { eager: true, cascade: true })
    @ManyToOne(() => ProductCategory, (productCategory) => productCategory.category, { eager: true })
    @JoinColumn({ name: 'productCategoryId' })
    productCategory: ProductCategory;

    // @ManyToOne(() => ProductPromotion, (productPromotion) => productPromotion.products, { eager: true, cascade: true })
    @ManyToOne(() => ProductPromotion, (productPromotion) => productPromotion.products, { eager: true })
    @JoinColumn({ name: 'productPromotionId' })
    productPromotion: ProductPromotion;

    @OneToMany(() => ProductColor, (productColor) => productColor.product)
    productColors: ProductColor[]

    @OneToMany(() => Image, (image) => image.product)
    images: Image[]

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
    orderProducts: OrderProduct[]

    // Chargement "Lazy" (à la demande)
    // @ManyToOne(() => ProductPromotion, (productPromotion) => productPromotion.products, { cascade: true })
    // @JoinColumn({ name: 'productPromotionId' })
    // productPromotion: Promise<ProductPromotion>;

}
