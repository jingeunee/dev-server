import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogInput } from './create-blog.input';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return await this.blogsRepository.find({ relations: ['user'] });
  }

  async create(user: User, params: CreateBlogInput): Promise<Blog> {
    const blog = new Blog();
    blog.title = params.title;
    blog.body = params.body;
    blog.thumbnail = params.thumbnail;
    blog.user = user;
    return await this.blogsRepository.save(blog);
  }

  async delete(id: number): Promise<boolean> {
    return this.blogsRepository.delete(id).then((res) => {
      if (res.affected > 0) {
        return true;
      }
      throw new NotFoundException();
    });
  }
}
