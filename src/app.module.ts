import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: path.resolve(__dirname, '..', `.env${process.env.NODE_ENV === 'production' ? '.prod' : ''}`),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log('sfd', path.resolve(__dirname, '..', `.env${process.env.NODE_ENV === 'production' ? '.prod' : ''}`))

        console.log(
          '--------------------------------',
          configService.get('DB_HOST'),
          configService.get('DB_PORT'),
          configService.get('DB_USER'),
          configService.get('DB_PASSWORD'),
          configService.get('DB_NAME'),
          process.env.DB_NAME
        )
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity.ts'],
          // migrations: [],
          // autoLoadEntities: true,
          // synchronize: true,
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
