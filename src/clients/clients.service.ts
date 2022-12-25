import { Repository } from 'typeorm/repository/Repository';
import { CreateClientDto } from './dtos/create-client.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entities/clients.entity';
import { UpdateClienteDto } from './dtos/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>,
  ) {}
  async getClientsList() {
    try {
      const clientData = await this.clientsRepository.find();
      return {
        statusCode: HttpStatus.OK,
        data: clientData,
      };
    } catch (error) {
      return error;
    }
  }

  async findOneClient(id: string) {
    try {
      const clientData = await this.clientsRepository.findOne({
        where: {
          id: id,
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data: {
          id: clientData.id,
          name: clientData.name,
          lastName: clientData.lastName,
          email: clientData.email,
          phoneNumber: clientData.phoneNumber,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async createClient(body: CreateClientDto) {
    try {
      await this.clientsRepository
        .createQueryBuilder()
        .insert()
        .values({
          name: body.name,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
        })
        .execute();
      return {
        statusCode: HttpStatus.OK,
        message: 'Cadastro criado com sucesso!',
      };
    } catch (error) {
      if (error.errno === 19) {
        return {
          message: 'Email já cadastrado',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    }
  }

  async UpdateClient(body: UpdateClienteDto, id: string) {
    try {
      await this.clientsRepository
        .createQueryBuilder()
        .update(Clients)
        .set({
          name: body.name,
          lastName: body.lastName,
          email: body.email,
          phoneNumber: body.phoneNumber,
        })
        .where('id = :id', { id: id })
        .execute();
      return {
        statusCode: HttpStatus.OK,
        message: `o cliente com id ${id} foi atualizado com Sucesso!`,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteClient(id: string) {
    try {
      await this.clientsRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: id })
        .execute();
      return {
        statusCode: HttpStatus.OK,
        message: `O id ${id} foi deletado com sucesso!`,
      };
    } catch (error) {
      return;
    }
  }
}
