// Library Imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConflictException, NotFoundException } from '@nestjs/common';

// Local Imports
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GetClientDto } from './dto/get-client.dto';
import { Client } from '../client/client.entity';
import { Role } from '../role/role.entity';


@Injectable()
export class ClientService {

   // -------------- Constructor --------------
   constructor(
      @InjectRepository(Client)
      private clientRepository: Repository<Client>,
      @InjectRepository(Role)
      private roleRepository: Repository<Role>,
   ) { }


   // ********** GET ALL**********
   async findAll(getClientsDto: GetClientDto): Promise<Client[]> {
      const { id, login, email, firstName, lastName, isActive, roleId } = getClientsDto;

      return await this.clientRepository.find({
         // select: ['id', 'login', 'email', 'firstName', 'lastName', 'isActive'],
         where: {
            ...(id && { id }),
            ...(login && { login }),
            ...(email && { email }),
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(isActive && { isActive }),
            ...(roleId && { roleId }),
         }
      });
   }


   // ********** GET BY ID **********
   async getById(id: number): Promise<Client> {
      try {
         return await this.clientRepository.findOne({
            where: { id: id },
            //  relations: { role: true }
         });
      } catch (error) {
         return error;
      }
   }


   // ********** POST / CREATE **********
   async createClient(createClientDto: CreateClientDto): Promise<Client> {
      // Check for duplicate email
      const existingClientByEmail = await this.clientRepository.findOne( {where: { email: createClientDto.email} });
      if (existingClientByEmail) {
         throw new ConflictException('Cette adresse email existe déjà.');
      }

      // Check for duplicate login
      const existingClientByLogin = await this.clientRepository.findOne( {where: { login: createClientDto.login} });
      if (existingClientByLogin) {
         throw new ConflictException('Ce login est déjà pris.');
      }

      // Check if role exist
      const role = await this.roleRepository.findOne({ where: { id: createClientDto.roleId } });
      if (!role) {
         throw new NotFoundException(`Le rôle avec l'ID ${createClientDto.roleId} n'existe pas`);
      }

      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createClientDto.password, salt);
      createClientDto.password = hashedPassword;

      const client = this.clientRepository.create(createClientDto);
      client.role = role;
      return await this.clientRepository.save(client);
   }


   // ********** UPDATE **********
   async updateClient(clientId: number, updateClientDto: UpdateClientDto): Promise<Client> {
      const client = await this.clientRepository.findOne({ where: { id: clientId } });

      if (!client) {
         throw new NotFoundException(`Client with ID ${clientId} not found`);
      }

      // Check for duplicate email
      if (updateClientDto.email && client.email !== updateClientDto.email) {
         const existingEmail = await this.clientRepository.findOne({ where: { email: updateClientDto.email } });
         if (existingEmail) {
            throw new ConflictException(`Cet email existe déjà.`);
         }
      }

      // Check for duplicate login
      if (updateClientDto.login && client.login !== updateClientDto.login) {
         const existingLogin = await this.clientRepository.findOne({ where: { login: updateClientDto.login } });
         if (existingLogin) {
            throw new ConflictException(`Ce login est déjà pris.`);
         }
      }

      // Update role if provided
      if (updateClientDto.roleId && client.role.id !== updateClientDto.roleId) {
         const role = await this.roleRepository.findOne({ where: { id: updateClientDto.roleId } });
         if (!role) {
            throw new NotFoundException(`Le rôle avec l'ID ${updateClientDto.roleId} n'existe pas`);
         }
         client.role = role;
         delete updateClientDto.roleId;
      }

      // Handle password hashing
      if (updateClientDto.password) {
         const isSamePassword = await bcrypt.compare(updateClientDto.password, client.password);
         if (!isSamePassword) {
            const salt = await bcrypt.genSalt();
            client.password = await bcrypt.hash(updateClientDto.password, salt);
         }
         delete updateClientDto.password;
      }

      // Merge DTO into client entity
      this.clientRepository.merge(client, updateClientDto);
      return await this.clientRepository.save(client);
   }

}
