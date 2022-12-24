import { CreatePetDTO } from './dtos/create-pet.dto';
import { Injectable } from '@nestjs/common';
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
      return petData;
    } catch (error) {
      console.log(error);
    }
  }

  async findOnePet(id: string) {
    try {
      const petData = await this.petsRepository.findOne({ where: { id: id } });
      return petData;
    } catch (error) {
      console.log(error);
    }
  }

  async createPet(body: CreatePetDTO) {
    try {
      const data = await this.petsRepository
        .createQueryBuilder()
        .insert()
        .values({
          name: body.petName,
          breed: body.petBreeder,
          petType: body.petType,
        })
        .execute();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePet(body: UpdatePetDto, id: string) {
    try {
      const petData = await this.petsRepository
        .createQueryBuilder()
        .update(Pets)
        .set({
          name: body.petName,
          breed: body.petBreeder,
          petType: body.petType,
        })
        .where('id = :id', { id: id })
        .execute();
      console.log(petData);
      return { ...petData };
    } catch (error) {
      console.log(error);
    }
  }

  async deletePet(id: string) {
    try {
      const petData = await this.petsRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: id })
        .execute();
      console.log(petData);
      return petData;
    } catch (error) {
      console.log(error);
    }
  }
}
