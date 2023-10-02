// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsString, Matches, Length, IsDefined } from 'class-validator';

// Local Imports
import { OrderStatus } from "../order-status/order-status.entity";


/**
 * Status entity represents a status in the system.
 * It has relationships with OrderStatus entitie.
 */
@Entity()
export class Status {

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
    
    @OneToMany(() => OrderStatus, (orderStatus) => orderStatus.status)
    orderStatuses: OrderStatus[]
}
