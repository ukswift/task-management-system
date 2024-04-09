import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { ProjectsModule } from './modules/projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'rxjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().optional().default(3000),
        GLOBAL_ROUTING_PREFIX: Joi.string().optional().default('api'),
        MONGODB_URI: Joi.string().required(),
      }),
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
export class AppModule {}
