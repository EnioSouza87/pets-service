import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phoneNumber: string;
}
