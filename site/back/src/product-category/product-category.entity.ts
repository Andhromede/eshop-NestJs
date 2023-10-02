// Library Imports
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
// import { IsDefined } from 'class-validator';

// Local Imports
import { Category } from "../category/category.entity";
import { Product } from "../product/product.entity";


/**
 * ProductCategory entity represents a productCategory in the system.
 * It has relationships with Category and Product entities.
 */
@Entity()
export class ProductCategory {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    // -------------- Relations --------------

    // @ManyToOne(() => Category, (category) => category.productCategory, { eager: true, cascade: true })
    @ManyToOne(() => Category, (category) => category.productCategory, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    // @IsDefined({ message: 'La catégorie est requise.' })
    category: Category;

    @OneToMany(() => Product, (product) => product.productCategory)
    // @IsDefined({ message: 'Les produits sont requis.' })
    products: Product[]
}
