// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsTwoDecimal } from '../helpers/Functions';
import { IsInt, Min } from 'class-validator';

// Local Imports
import { Product } from "../product/product.entity";
import { Order } from "../order/order.entity";


/**
 * OrderProduct entity represents a orderProduct in the system.
 * It has relationships with Product and Order entities.
 */
@Entity()
export class OrderProduct {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    // -------------- Validation Fields --------------

    // QUANTITY
    @Column('int')
    @IsInt({ message: 'La quantité doit être un entier.' })
    @Min(1, { message: 'La quantité doit être supérieure ou égale à 1.' })
    quantity: number;

    // PRICE
    @Column('decimal', { precision: 7, scale: 2 })
    @IsTwoDecimal({ message: 'Le prix doit avoir au maximum deux décimales.' })
    @Min(0.01, { message: 'Le prix doit être supérieure ou égale à 0.01.' })
    price: number;

    // -------------- Relations --------------

    @ManyToOne(() => Product, (product) => product.orderProducts)
    product: Product;

    // @ManyToOne(() => Order, (order) => order.orderProducts, { eager: true, cascade: true })
    @ManyToOne(() => Order, (order) => order.orderProducts, { eager: true })
    @JoinColumn({ name: 'orderId' })
    order: Order;
}
