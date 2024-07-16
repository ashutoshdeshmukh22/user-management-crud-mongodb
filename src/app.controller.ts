import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get health check',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  getHello(): number {
    return this.appService.helthCheck();
  }
}
