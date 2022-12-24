import { UpdateClienteDto } from './dtos/update-client.dto';
import { CreateClientDto } from './dtos/create-client.dto';
import { ClientsService } from './clients.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteDateColumn } from 'typeorm';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get('list')
  public getClientsList() {
    return this.clientsService.getClientsList();
  }

  @Get(':id')
  public findOneClient(@Param('id') id: string) {
    return this.clientsService.findOneClient(id);
  }

  @Post('/create-client')
  public createClient(@Body() body: CreateClientDto) {
    return this.clientsService.createClient(body);
  }

  @Put('/update/:id')
  public updateClient(@Body() body: UpdateClienteDto, @Param('id') id: string) {
    return this.clientsService.UpdateClient(body, id);
  }

  @Delete('/delete/:id')
  public deleteCliente(@Param('id') id: string) {
    return this.clientsService.deleteClient(id);
  }
}
