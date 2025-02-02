import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAppProvider } from './firebase-app-provider';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseAppProvider],
  exports: [FirebaseAppProvider],
})
export class FirebaseModule {}
