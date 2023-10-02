// Library Imports
import { JoinColumn, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index } from 'typeorm';
import { IsBoolean, IsString, Matches, IsDefined, IsEmail, Length } from 'class-validator';

// Local Imports
import { Order } from "../order/order.entity";
import { Role } from "../role/role.entity";
import { Contact } from "../contact/contact.entity";


/**
 * Client entity represents a client in the system.
 * It has relationships with Order, Role, and Contact entities.
 */
@Entity()
export class Client {

    // -------------- Attributes --------------

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;

    // -------------- Validation Fields --------------

    // LOGIN
    @Index()
    @Column({ length: 50, unique: true, nullable: false })
    @Length(3, 50)
    @IsDefined()
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Le login ne doit contenir que des lettres et des chiffres', })
    login: string;

    // EMAIL
    @Index()
    @Column({ length: 100, unique: true, nullable: false })
    @Length(5, 100)
    @IsDefined()
    @IsEmail({}, { message: 'L\'adresse email n\'est pas valide' })
    email: string;

    // PASSWORD
    @Column({ length: 255, nullable: false })
    @Length(5, 255)
    @IsDefined()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial, et doit avoir une longueur minimale de 8 caractères' }
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/,
        // { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, et doit avoir une longueur minimale de 5 caractères' }
    )
    password: string;

    // FIRST NAME
    @Column({ length: 50 })
    @Length(3, 50)
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le prénom ne doit contenir que des lettres', })
    firstName: string;

    // LAST NAME
    @Column({ length: 50 })
    @Length(3, 50)
    @IsString()
    @Matches(/^[a-zA-Z]+$/, { message: 'Le nom ne doit contenir que des lettres', })
    lastName: string;

    // -------------- Relations --------------

    @OneToMany(() => Order, (order) => order.client)
    orders: Order[]

    // @ManyToOne(() => Role, (role) => role.clients, { eager: true, cascade: true })
    @ManyToOne(() => Role, (role) => role.clients, { eager: true })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[]

}