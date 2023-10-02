// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsDate } from 'class-validator';

// Local Imports
import { Order } from "../order/order.entity";
import { Status } from "../status/status.entity";


/**
 * OrderStatus entity represents a orderStatus in the system.
 * It has relationships with Status and Order entities.
 */
@Entity()
export class OrderStatus {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    // -------------- Validation Fields --------------

    // STATUS DATE
    // @Column('datetime')
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    statusDate: Date;

    // -------------- Relations --------------

    // @ManyToOne(() => Order, (order) => order.orderStatuses, { eager: true, cascade: true })
    @ManyToOne(() => Order, (order) => order.orderStatuses, { eager: true })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    // @ManyToOne(() => Status, (status) => status.orderStatuses, { eager: true, cascade: true })
    @ManyToOne(() => Status, (status) => status.orderStatuses, { eager: true })
    @JoinColumn({ name: 'statusId' })
    status: Status;
}
