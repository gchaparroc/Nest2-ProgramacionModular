import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly codigo: number;
  }
  
  export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}