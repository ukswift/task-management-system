import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { ProjectsModule } from './modules/projects/projects.module';
import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().optional().default(3000),
        GLOBAL_ROUTING_PREFIX: Joi.string().optional().default('api'),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        quietReqLogger: true,
        level: 'trace',
        genReqId: (_) => {
          return uuidv4();
        },
        formatters: {
          level: (label, number) => ({
            level: `${label}-${number}`,
          }),
        },
      },
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
