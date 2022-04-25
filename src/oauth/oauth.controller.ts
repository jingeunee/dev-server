import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { OauthService } from './oauth.service';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService,
    private readonly userService: UserService,
  ) {}

  @Post('/kakao')
  async getKakao(@Body() data: { code: string }): Promise<void> {
    const token = await this.oauthService.getKakaoToken(data.code);
    const profile = await this.oauthService.getKakaoProfile(token.access_token);

    const findSnsUser = await this.userService.findSnsId(profile.id, 'kakao');
    console.log(profile, findSnsUser);
    if (!findSnsUser) {
      await this.userService.create({
        name: profile.kakao_account.profile.nickname,
        image: profile.kakao_account.profile.thumbnail_image_url,
        snsId: profile.id,
        provider: 'kakao',
      });
    }

    return token;
  }
}
