// Library Imports
import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

// Local Imports
import { Product } from "../product/product.entity";
import { Promotion } from "../promotion/promotion.entity";


/**
 * ProductPromotion entity represents a productPromotion in the system.
 * It has relationships with Product and Promotion entities.
 */
@Entity()
export class ProductPromotion {
    
    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;
   
    // -------------- Relations --------------

    @OneToMany(() => Product, (product) => product.productPromotion)
    products: Product[]

    // @ManyToOne(() => Promotion, (promotion) => promotion.productPromotions, { eager: true, cascade: true })
    @ManyToOne(() => Promotion, (promotion) => promotion.productPromotions, { eager: true })
    @JoinColumn({ name: 'promotionId' })
    promotion: Promotion;
}
