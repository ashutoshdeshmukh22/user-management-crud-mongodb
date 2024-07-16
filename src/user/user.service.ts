import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async createuser(createUserDto: CreateUserDto): Promise<IUser> {
    const newuser = new this.userModel(createUserDto);
    return await newuser.save();
  }

  async updateuser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existinguser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existinguser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existinguser;
  }

  async getAllusers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('users data not found!');
    }
    return userData;
  }

  async getuserbyemail(email: string): Promise<IUser> {
    const existinguser = await this.userModel.findOne({ email: email });
    return existinguser;
  }

  async getuser(userId: string): Promise<IUser> {
    const existinguser = await this.userModel.findById(userId).exec();
    return existinguser;
  }

  async deleteuser(userId: string): Promise<IUser> {
    const deleteduser = await this.userModel.findByIdAndDelete(userId);
    if (!deleteduser) {
      throw new NotFoundException('user not found');
    }
    return deleteduser;
  }
}
