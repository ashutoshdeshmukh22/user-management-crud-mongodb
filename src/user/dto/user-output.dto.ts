import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IUser } from '../interface/user.interface';

export class UserOutputDto {
  constructor(user: IUser) {
    this.firstName = user.firstName;
    this.lastname = user.lastName;
    this.email = user.email;
    this.age = user.age;
  }

  @ApiProperty()
  @Expose()
  readonly firstName: string;

  @ApiProperty()
  @Expose()
  readonly lastname: string;

  @ApiProperty()
  @Expose()
  readonly email: string;

  @ApiProperty()
  @Expose()
  readonly age: number;
}
