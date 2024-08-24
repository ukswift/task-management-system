import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { ProjectsModule } from './modules/projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config/config';

import { LoggerModule } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { Request } from 'express';
import * as Joi from 'joi';

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
        genReqId: (req: Request) => {
          return req.headers['x-correlation-id'] ?? uuidv4();
        },
        customAttributeKeys: { reqId: 'correlationId' },
        // formatters: {
        //   level: (label, number) => ({
        //     level: `${label}-${number}`,
        //   }),
        // },
        transport: {
          targets: [
            { target: 'pino-pretty' },
            {
              target: 'pino/file',
              options: { destination: './logs/logs.log' },
            },
          ],
        },

        customReceivedMessage: (req, res) => {
          return `request received: ${req.method} ${req.url}`;
        },
        customReceivedObject: (req, res, val) => {
          return req;
        },
        customLogLevel: function (req, res, err) {
          console.log({ pppppppppppppp: res.statusCode });
          if (res.statusCode >= 400 && res.statusCode < 500) {
            return 'warn';
          } else if (res.statusCode >= 500 || err) {
            return 'error';
          }
          return 'info';
        },
      },
    }),

    TasksModule,
    ProjectsModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get<string>('MONGODB_URI') };
      },
      inject: [ConfigService],
    }),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
