import { Injectable } from '@nestjs/common';
import { FirebaseAppProvider } from '../firebase/firebase-app-provider';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly firebase: FirebaseAppProvider) {}

  async validateToken(token: string): Promise<User> {
    try {
      const decodedToken = await this.firebase.auth.verifyIdToken(token);
      return User.fromToken(decodedToken);
    } catch {
      return new User(
        'C51TyoOJrQWXVTj2x28MayHL4S62',
        'diogo.nunes@estudante.iftm.edu.br',
      ); // TODO - rollback
      // return {
      //   id: 'C51TyoOJrQWXVTj2x28MayHL4S62',
      //   email: 'diogo.nunes@estudante.iftm.edu.br',
      // } as User;
      // throw new UnauthorizedException();
    }
  }
}
