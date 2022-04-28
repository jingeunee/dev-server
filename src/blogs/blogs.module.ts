import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Blog } from './blog.entity';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User])],
  providers: [BlogsService, BlogsResolver, UserService],
})
export class BlogsModule {}
