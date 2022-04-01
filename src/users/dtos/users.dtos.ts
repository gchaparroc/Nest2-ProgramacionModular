import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'El mail del usuario' })
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @Length(6)
    readonly password: string;
    @IsString()
    @IsNotEmpty()
    readonly role: string;    
  }
  
  export class UpdateUserDto extends PartialType(CreateUserDto) {}