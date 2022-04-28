import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import configuration from './config/configuration';
import { AuthMiddleware } from './middleware/auth';
import { OauthModule } from './oauth/oauth.module';
import { Todo } from './todos/todo.entity';
import { TodosModule } from './todos/todos.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { BlogsModule } from './blogs/blogs.module';
import { Blog } from './blogs/blog.entity';

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
        entities: [User, Todo, Blog],
        synchronize: true,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      path: 'blogs',
      include: [BlogsModule],
      context: async ({ req, res, connection }) => {
        if (req) {
          await AuthMiddleware(req, res, function () {});
          return req;
        } else {
          return connection;
        }
      },
    }),
    UserModule,
    TodosModule,
    OauthModule,
    BlogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('user', 'todos', 'blogs');
  }
}
