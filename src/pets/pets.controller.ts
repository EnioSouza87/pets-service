import { CreatePetDTO } from './dtos/create-pet.dto';
import { PetsService } from './pets.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdatePetDto } from './dtos/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Get('list')
  public getPets() {
    return this.petsService.getPets();
  }

  @Get(':id')
  public findOnePet(@Param('id') id: string) {
    return this.petsService.findOnePet(id);
  }

  @Post('/create-pet')
  public createPet(@Body() body: CreatePetDTO) {
    return this.petsService.createPet(body);
  }

  @Put('/update/:id')
  public updatePet(@Body() body: UpdatePetDto, @Param('id') id: string) {
    return this.petsService.updatePet(body, id);
  }

  @Delete('/delete/:id')
  public deletePet(@Param('id') id: string) {
    return this.petsService.deletePet(id);
  }
}
