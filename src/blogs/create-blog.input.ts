import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBlogInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @Field()
  @IsString()
  readonly thumbnail: string;
}
