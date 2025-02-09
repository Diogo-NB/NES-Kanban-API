import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export class User {
  readonly id: string;
  readonly email: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  static fromToken(decodedToken: DecodedIdToken): User {
    return new User(decodedToken.uid, decodedToken.email!);
  }
}
