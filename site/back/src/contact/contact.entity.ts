// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsBoolean, IsString, Matches, Length } from 'class-validator';

// Local Imports
import { Order } from "../order/order.entity";
import { Client } from "../client/client.entity";


/**
 * Contact entity represents a contact in the system.
 * It has relationships with Order and client entities.
 */
@Entity()
export class Contact {

    // -------------- Attributes --------------
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;

    // -------------- Validation Fields --------------

    // TEL
    @Column({ length : 20 })
    @Length(5, 20)
    @IsString()
    @Matches(/^\+?(\d{2})?\d{10}$/, { message: 'Le numéro de téléphone n\'est pas valide.' })
    tel: string;

    // ADRESS
    @Column({ length : 150 })
    @Length(5, 150)
    @IsString()
    adress: string;

    // ADDITIONAL
    @Column({ length : 100 })
    @Length(3, 100)
    @IsString()
    additional: string;

    // CP
    @Column({ length : 20 })
    @Length(3, 20)
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Le code postal ne doit contenir que des chiffres.' })
    cp: string;
    
    // CITY
    @Column({ length : 50 })
    @Length(3, 50)
    @IsString()
    city: string;

    //COUNTRY
    @Column({ length : 50 })
    @Length(3, 50)
    @IsString()
    country: string;

    // -------------- Relations --------------

    @OneToMany(() => Order, (order) => order.contact)
    orders: Order[]

    // @ManyToOne(() => Client, (client) => client.contacts, { eager: true, cascade: true })
    @ManyToOne(() => Client, (client) => client.contacts, { eager: true })
    @JoinColumn({ name: 'clientId' })
    client: Client;
}
