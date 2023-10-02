// Library Imports
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsBoolean, IsString, Matches, Length, IsDefined } from 'class-validator';

// Local Imports
import { Client } from "../client/client.entity";


/**
 * Role entity represents a role in the system.
 * It has relationships with Client entitie.
 */
@Entity()
export class Role {

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

    @OneToMany(() => Client, (client) => client.role)
    clients: Client[]
    
}