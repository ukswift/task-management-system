import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthStatus() {
    return { healthStatus: 'UP' };
  }
}
//
