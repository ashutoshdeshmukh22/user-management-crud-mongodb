import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DB_NAME, DB_URL } from './environment';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
