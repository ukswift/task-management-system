import { Controller, Get, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @Version(VERSION_NEUTRAL)
  getHealthStatus() {
    return this.appService.getHealthStatus();
  }

  @Get('temp')
  @Version(VERSION_NEUTRAL)
  temp() {
    return 'temp';
  }
}
