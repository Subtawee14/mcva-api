import { Response } from 'express';
import { Controller, Body, Post, Res, Redirect } from 'routing-controllers';

import AuthService from '@services/auth.service';

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Post('/connect')
  @Redirect('https://mcva-lti-web-demo.vercel.app')
  async connect(@Res() res: Response, @Body() body: any) {
    console.log(body);
    const { cookie } = await this.authService.login(body);
    res.setHeader('Set-Cookie', [cookie]);
  }
}
