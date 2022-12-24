import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePetDTO {

  @IsString()
  @IsNotEmpty()
  petName: string;

  @IsString()
  @IsNotEmpty()
  petBreeder: string;

  @IsString()
  @IsNotEmpty()
  petType: string;
}
