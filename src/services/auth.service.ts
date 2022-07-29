import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

class AuthService {
  public users = userModel;

  public async login(data: any): Promise<{ cookie: string; data: any; tokenData: TokenData }> {
    const tokenData = this.createToken(data);
    const cookie = this.createCookie(tokenData);

    return { cookie, data, tokenData };
  }

  public createToken(data: any): TokenData {
    const dataStoredInToken: DataStoredInToken = { ...data };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
