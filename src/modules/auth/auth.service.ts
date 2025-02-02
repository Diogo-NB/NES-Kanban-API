import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAppProvider } from '../firebase/firebase-app-provider';
import { User } from '../users/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly firebase: FirebaseAppProvider) {}

  async validateToken(token: string): Promise<User> {
    try {
      const decodedToken = await this.firebase.auth.verifyIdToken(token);
      return User.fromToken(decodedToken);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
