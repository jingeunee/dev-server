import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { Request, Response } from 'express';

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: Function,
) {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    throw new BadRequestException();
  }

  try {
    const kakaoToken = await axios
      .get(`https://kapi.kakao.com/v1/user/access_token_info`, {
        headers: {
          authorization,
        },
      })
      .then((res) => res.data);
    (req as unknown as { user: any }).user = kakaoToken;
    next();
  } catch (error) {
    throw new BadRequestException(error);
  }
}
