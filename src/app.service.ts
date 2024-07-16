import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  helthCheck(): number {
    return HttpStatus.OK;
  }
}
