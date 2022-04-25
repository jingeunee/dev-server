import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

const {
  KAKAO_CLIENT_ID = '',
  KAKAO_REDIRECT_URI = '',
  KAKAO_CLIENT_SECRET = '',
} = process.env;

@Injectable()
export class OauthService {
  async getKakaoToken(code: string): Promise<any> {
    if (!code) {
      throw new NotFoundException();
    }

    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`;

    try {
      return await axios(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      }).then((res) => res.data);
    } catch (error) {
      console.info(error);
    }
  }
  async getKakaoProfile(accessToken: string) {
    if (!accessToken) {
      throw new NotFoundException();
    }

    const url = `https://kapi.kakao.com/v2/user/me?client_secret=${KAKAO_CLIENT_SECRET}`;

    try {
      return await axios(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.data);
    } catch (error) {
      console.info(error);
    }
  }
}
