import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdatePetDto {

  @IsOptional()
  @IsString()
  petName: string;

  @IsOptional()
  @IsString()
  petBreeder: string;

  @IsOptional()
  @IsString()
  petType: string;
}
