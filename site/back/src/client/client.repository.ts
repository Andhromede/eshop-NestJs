// // import { EntityRepository, Repository } from 'typeorm';
// import { Injectable } from "@nestjs/common";
// import { Client } from '../entities/client.entity';
// import { Role } from '../entities/role.entity';
// import { DataSource } from 'typeorm';


// @Injectable()
// export class ClientRepository {

//     constructor(private dataSource: DataSource) { }
//     personRepository = this.dataSource.getRepository(Client);
//     roleRepository = this.dataSource.getRepository(Role);

//     // Search all users
//     async GetAllClients(): Promise<Client[]> {
//         try {
//             return await this.personRepository.find({ relations: { role: true } })
//         } catch (error) {
//             return error;
//         }
//     }

//     // Search one user by ID
//     async GetClientById(personId: number): Promise<Client> {
//         try {
//             return await this.personRepository.findOne({
//                 where: { id: personId },
//                 relations: { role: true }
//             });
//         } catch (error) {
//             return error;
//         }

//     }

//     // Search one users by EMAIL
//     async GetClientByEmail(email: string): Promise<Client> {
//         try {
//             return await this.personRepository.findOne({
//                 where: { email: email },
//                 relations: { role: true } 
//             });
//         } catch (error) {
//             return error;
//         }

//     }

//     // Create one user if didn't exist
//     async CreateClient(
//         lastName: string,
//         firstName: string,
//         email: string,
//         password: string,
//         adress: string,
//         birthday: Date,
//         isActive: boolean,
//         roleId: number
//     ): Promise<Client> {
//         try {
//             const roleClient = await this.roleRepository.findOne({ where: { id: roleId } });
//             const client = await this.personRepository.create(
//                 { firstName, lastName, email, password, adress, birthday, isActive }
//             );
//             client.role = roleClient;
//             return this.personRepository.save(client);
//         } catch (error) {
//             return error;
//         }
//     }

//     // Update one users
//     async updateClient(
//         personId: number,
//         lastName: string,
//         firstName: string,
//         email: string,
//         password: string,
//         adress: string,
//         birthday: Date,
//         isActive: boolean,
//         roleId: number
//     ): Promise<Client> {

//         try {
//             const client = await this.personRepository.findOneBy({ id: personId });
//             const roleClient = await this.roleRepository.findOne({ where: { id: roleId } });
//             client.lastName = lastName;
//             client.firstName = firstName;
//             client.email = email;
//             client.password = password;
//             client.adress = adress;
//             client.birthday = birthday;
//             client.isActive = isActive;
//             client.role = roleClient;
//             return this.personRepository.save(client);
//         } catch (error) {
//             return error;
//         }
//     }

//     // HARD DELETE
//     deleteClient(personId: number) {
//         try {
//             this.personRepository.delete(personId);
//             return "Client is deleted";
//         } catch (error) {
//             return error;
//         }
//     }

//     // SOFT Delete
//     async disabledClient( personId: number ): Promise<Client> {
//         try {
//             const client = await this.personRepository.findOneBy({ id: personId });
//             client.lastName = "Anonyme";
//             client.firstName = "Anonyme";
//             client.email = "Anonyme";
//             client.password = "0000";
//             client.adress = "Anonyme";
//             client.birthday = new Date();
//             client.isActive = false;
//             return this.personRepository.save(client);
//         } catch (error) {
//             return error;
//         }
//     }
// }