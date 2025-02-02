import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/user.interface';
import { FirebaseAppProvider } from '../firebase/firebase-app-provider';

@Injectable()
export class UsersService {
  constructor(private readonly firebase: FirebaseAppProvider) {}

  async findOne(email: string): Promise<User | undefined> {
    const userRecord = await this.firebase.auth.getUserByEmail(email);
    console.log(userRecord);
    return {
      id: userRecord.uid,
      email: userRecord.email!,
    };
  }
}
