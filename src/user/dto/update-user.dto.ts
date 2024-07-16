import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(30)
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly age: number;
}
