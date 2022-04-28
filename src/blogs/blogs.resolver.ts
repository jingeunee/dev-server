import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { Blog } from './blog.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogInput } from './create-blog.input';

@Resolver(() => Blog)
export class BlogsResolver {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Blog])
  getList(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Mutation(() => Blog)
  async create(
    @Context() ctx,
    @Args('createBlogData') createBlogData: CreateBlogInput,
  ): Promise<Blog> {
    const user = await this.userService.findSnsId(ctx.user.id, 'kakao');
    return this.blogsService.create(user, createBlogData);
  }

  @Mutation(() => Boolean)
  delete(@Args('id') id: string) {
    return this.blogsService.delete(+id);
  }
}
