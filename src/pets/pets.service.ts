import { CreatePetDTO } from './dtos/create-pet.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pets } from './entities/pets.entity';
import { Repository } from 'typeorm/repository/Repository';
import { UpdatePetDto } from './dtos/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets) private readonly petsRepository: Repository<Pets>,
  ) {}
  async getPets() {
    try {
      const petData = await this.petsRepository.find();
      return {
        statusCode: HttpStatus.OK,
        data: petData,
      };
    } catch (error) {
      return;
    }
  }

  async findOnePet(id: string) {
    try {
      const petData = await this.petsRepository.findOne({ where: { id: id } });
      return {
        statusCode: HttpStatus.OK,
        data: {
          id: petData.id,
          petName: petData.name,
          petBreeder: petData.breed,
          petType: petData.petType,
        },
      };
    } catch (error) {
      return;
    }
  }

  async createPet(body: CreatePetDTO) {
    try {
      await this.petsRepository
        .createQueryBuilder()
        .insert()
        .values({
          name: body.petName,
          breed: body.petBreeder,
          petType: body.petType,
        })
        .execute();

      return {
        statusCode: HttpStatus.OK,
        message: `Cadastro criado com sucesso!`,
      };
    } catch (error) {
      if (error.errno === 19) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Não foi possível cadastrar pet! Identificação já cadastrada!',
        };
      }
    }
  }

  async updatePet(body: UpdatePetDto, id: string) {
    try {
      await this.petsRepository
        .createQueryBuilder()
        .update(Pets)
        .set({
          name: body.petName,
          breed: body.petBreeder,
          petType: body.petType,
        })
        .where('id = :id', { id: id })
        .execute();

      return {
        statusCode: HttpStatus.OK,
        message: `Cadastro com o id ${id} atualizado com sucesso!`,
      };
    } catch (error) {
      return;
    }
  }

  async deletePet(id: string) {
    try {
      const petData = await this.petsRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: id })
        .execute();
      return {
        statusCode: HttpStatus.OK,
        message: `cadastro com o ${id}  deletado com sucesso!`,
      };
    } catch (error) {
      return;
    }
  }
}
