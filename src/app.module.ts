import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
      }),
    }),
    TasksModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
