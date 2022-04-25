import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import configuration from './config/configuration';
import { OauthModule } from './oauth/oauth.module';
import { Todo } from './todos/todo.entity';
import { TodosModule } from './todos/todos.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration 설정을 coifg module 불러 올 때 로드한다
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'oracle',
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        connectString: configService.get('database.connectString'),
        // entities: [join(__dirname, '/**/*.entity.js')],
        entities: [User, Todo],
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    UserModule,
    TodosModule,
    OauthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
