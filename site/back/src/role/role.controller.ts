// Library Imports
import {
   Controller,
   Get,
   Query,
   ValidationPipe,
   Post,
   Put,
   Body,
   Patch,
   Param,
   Delete,
   ParseIntPipe
} from '@nestjs/common';

// Local Imports
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDto } from '../role/dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRoleDto } from './dto/get-role.dto';


@Controller('role')
export class RoleController {

   constructor(private readonly roleService: RoleService) { }

   // ********** GET ALL **********
   @Get()
   async findAll(@Query(new ValidationPipe()) getRolesDto: GetRoleDto): Promise<Role[]> {
      return await this.roleService.findAll(getRolesDto);
   }


   // ********** POST / CREATE **********
   @Post()
   async createRole(@Body(new ValidationPipe()) createRoleDto: CreateRoleDto): Promise<Role> {
      return await this.roleService.createRole(createRoleDto);
   }


   // @Post()
   // create(@Body() createRoleDto: CreateRoleDto) {
   //    return this.roleService.create(createRoleDto);
   // }

   // @Get()
   // findAll() {
   //   return this.roleService.findAll();
   // }

   // @Get(':id')
   // findOne(@Param('id') id: string) {
   //   return this.roleService.findOne(+id);
   // }

   // @Patch(':id')
   // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
   //   return this.roleService.update(+id, updateRoleDto);
   // }

   // @Delete(':id')
   // remove(@Param('id') id: string) {
   //   return this.roleService.remove(+id);
   // }
}
