// Library Imports
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column } from 'typeorm';
import { Min } from 'class-validator';
import { IsTwoDecimal } from '../helpers/Functions';

// Local Imports
import { OrderProduct } from "../order-product/order-product.entity";
import { Promotion } from "../promotion/promotion.entity";
import { OrderStatus } from "../order-status/order-status.entity";
import { Client } from "../client/client.entity";
import { Contact } from "../contact/contact.entity";


/**
 * Order entity represents a order in the system.
 * It has relationships with OrderProduct, Promotion, OrderStatus, Client and Contact entities.
 */
@Entity()
export class Order {
    
    // -------------- Attributes --------------
    @PrimaryGeneratedColumn()
    id: number;

    // -------------- Validation Fields --------------

    // TOTAL PRICE
    @Column('decimal', { precision: 10, scale: 2 })
    @Min(0, { message: 'Le prix doit être positif.' })
    @IsTwoDecimal({ message: 'Le prix total doit avoir au maximum deux décimales.' })
    totalPrice: number;

    // -------------- Relations --------------

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[]

    // @ManyToOne(() => Promotion, (promotion) => promotion.orders, { eager: true, cascade: true })
    @ManyToOne(() => Promotion, (promotion) => promotion.orders, { eager: true })
    @JoinColumn({ name: 'promotionId' })
    promotion: Promotion;

    @OneToMany(() => OrderStatus, (orderStatus) => orderStatus.order)
    orderStatuses: OrderStatus[]

    // @ManyToOne(() => Client, (client) => client.orders, { eager: true, cascade: true })
    @ManyToOne(() => Client, (client) => client.orders, { eager: true })
    @JoinColumn({ name: 'clientId' })
    client: Client;

    // @ManyToOne(() => Contact, (contact) => contact.orders, { eager: true, cascade: true })
    @ManyToOne(() => Contact, (contact) => contact.orders, { eager: true })
    @JoinColumn({ name: 'contactId' })
    contact: Contact;
}
