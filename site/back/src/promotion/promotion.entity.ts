// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsInt, Min, Max, IsDate, IsBoolean } from 'class-validator';

// Local Imports
import { ProductPromotion } from "../product-promotion/product-promotion.entity";
import { Order } from "../order/order.entity";


/**
 * Promotion entity represents a promotion in the system.
 * It has relationships with ProductPromotion and Order entities.
 */
@Entity()
export class Promotion {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;

    // -------------- Validation Fields --------------

    // PERCENTAGE
    @Column('int')
    @IsInt({ message: 'Le pourcentage doit être un entier.' })
    @Min(0, { message: 'Le pourcentage ne peut pas être inférieur à 0.' })
    @Max(100, { message: 'Le pourcentage ne peut pas dépasser 100.' })
    percentage: number;

    // START DATE
    // @Column('datetime')
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    startDate: Date;

    //END DATE
    // @Column('datetime')
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    endDate: Date;

    // -------------- Relations --------------
    
    @OneToMany(() => ProductPromotion, productPromotion => productPromotion.promotion)
    productPromotions: ProductPromotion[];

    @OneToMany(() => Order, (order) => order.promotion)
    orders: Order[]
    
}
