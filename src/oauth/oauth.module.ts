import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [OauthController],
  providers: [OauthService, UserService],
})
export class OauthModule {}
