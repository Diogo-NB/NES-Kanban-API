import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export class User {
  readonly id: string;
  readonly email: string;

  static fromToken(decodedToken: DecodedIdToken): User {
    return {
      id: decodedToken.uid,
      email: decodedToken.email!,
    } as User;
  }
}
