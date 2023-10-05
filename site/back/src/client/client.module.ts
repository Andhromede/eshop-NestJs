import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Role } from '../role/role.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([Client]),
      TypeOrmModule.forFeature([Role]),
   ],
   controllers: [ClientController],
   providers: [ClientService],
})
export class ClientModule { }
