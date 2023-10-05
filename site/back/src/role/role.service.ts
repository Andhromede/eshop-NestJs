// Library Imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

// Local Imports
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { Role } from '../role/role.entity';


@Injectable()
export class RoleService {

   // -------------- Constructor --------------
   constructor(
      @InjectRepository(Role)
      private roleRepository: Repository<Role>,
   ) { }


   // ********** GET ALL **********
   async findAll(getRolesDto: GetRoleDto): Promise<Role[]> {
      const { id, name, isActive } = getRolesDto;

      return await this.roleRepository.find({
         where: {
            ...(id && { id }),
            ...(name && { name }),
            ...(isActive && { isActive })
         }
      });
   }


   // ********** POST **********
   async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
      const existingRoleByName = await this.roleRepository.findOne({
         where: { name: createRoleDto.name }
      });

      if (existingRoleByName) {
         throw new ConflictException('Ce role existe déjà.');
      }

      const role = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(role);
   }









   // create(createRoleDto: CreateRoleDto) {
   //   return 'This action adds a new role';
   // }

   // findAll() {
   //   return `This action returns all role`;
   // }

   // findOne(id: number) {
   //   return `This action returns a #${id} role`;
   // }

   // update(id: number, updateRoleDto: UpdateRoleDto) {
   //   return `This action updates a #${id} role`;
   // }

   // remove(id: number) {
   //   return `This action removes a #${id} role`;
   // }
}
