import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserOutputDto } from './dto/user-output.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Add a User',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserOutputDto,
    description: 'User added successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @HttpCode(HttpStatus.OK)
  async createuser(@Res() response, @Body() createuserDto: CreateUserDto) {
    try {
      const user = await this.userService.getuserbyemail(createuserDto.email);
      if (user) {
        throw new Error('User Already Exist');
      }
      const newuser = await this.userService.createuser(createuserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'user has been created successfully',
        user: new UserOutputDto(newuser),
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: user not created!',
        error: err.message,
      });
    }
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update a User',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserOutputDto,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @HttpCode(HttpStatus.OK)
  async updateuser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateuserDto: UpdateUserDto,
  ) {
    try {
      const existinguser = await this.userService.updateuser(
        userId,
        updateuserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'user has been successfully updated',
        user: new UserOutputDto(existinguser),
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserOutputDto],
    description: 'Users fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @HttpCode(HttpStatus.OK)
  async getusers(@Res() response) {
    try {
      const userData = await this.userService.getAllusers();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        userData: userData.map((user) => new UserOutputDto(user)),
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a User',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserOutputDto],
    description: 'User fetched successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @HttpCode(HttpStatus.OK)
  async getuser(@Res() response, @Param('id') userId: string) {
    try {
      const existinguser = await this.userService.getuser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'user found successfully',
        user: new UserOutputDto(existinguser),
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a User',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @HttpCode(HttpStatus.OK)
  async deleteuser(@Res() response, @Param('id') userId: string) {
    try {
      const deleteduser = await this.userService.deleteuser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'user deleted successfully',
        deleteduser: new UserOutputDto(deleteduser),
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
