import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './common/guards/authentication/authentication.guard';
import { ProjectsModule } from './modules/projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TasksModule,
    ProjectsModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get<string>('MONGODB_URI'));
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
