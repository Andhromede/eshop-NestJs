// Library Imports
import {
   Controller,
   Query,
   Param,
   Body,
   ValidationPipe,
   ParseIntPipe,
   Get,
   Post,
   Put,
   Patch,
   Delete,
} from '@nestjs/common';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

// Local Imports
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { GetClientDto } from './dto/get-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';


// l'intercepteur ClassSerializerInterceptor s'assure que la sérialisation est correctement 
//effectuée en tenant compte des annotations class-transformer comme @Exclude().
@Controller('client')
@UseInterceptors(ClassSerializerInterceptor)
export class ClientController {

   // -------------- Constructor --------------
   constructor(private readonly clientService: ClientService) { }

   
   // ********** GET ALL **********
   @Get()
   async findAll(@Query(new ValidationPipe()) getClientsDto: GetClientDto): Promise<Client[]> {
      return await this.clientService.findAll(getClientsDto);
   }


   // ********** GET BY ID **********
   @Get(':id')
   async getById(@Param('id', ParseIntPipe) id: number): Promise<Client> {
      return await this.clientService.getById(id);
   }


   // ********** POST **********
   @Post()
   async createClient(@Body(new ValidationPipe()) createClientDto: CreateClientDto): Promise<Client> {
      return await this.clientService.createClient(createClientDto);
   }

   
   // ********** UPDATE **********
   @Put(':id')
   async updateClient(
      @Param('id', new ParseIntPipe()) clientId: number,
      @Body(new ValidationPipe()) updateClientDto: UpdateClientDto,
   ): Promise<Client> {
      return this.clientService.updateClient(clientId, updateClientDto);
   }










   // // GET BY ID
   // @Get(':id')
   // findOne(@Param('id') id: string) {
   //    return this.clientService.findOne(+id);
   // }

   // // POST
   // @Post()
   // create(@Body() createClientDto: CreateClientDto) {
   //    return this.clientService.create(createClientDto);
   // }

   // // UPDATE
   // @Patch(':id')
   // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
   //    return this.clientService.update(+id, updateClientDto);
   // }

   // // DELETE
   // @Delete(':id')
   // remove(@Param('id') id: string) {
   //    return this.clientService.remove(+id);
   // }

}
