import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import constants from "./constants";
import { join } from 'path';

@Module({
    imports: [ClientsModule.register([{
        name: 'USER_CLIENT',
        transport: Transport.GRPC,
        options: {
            // url: 'redis://localhost:6379',                  <-- remove this
            package: 'app', //                                 <-- add this
            protoPath: join(__dirname, '../src/app.proto'), // <-- & this
          },
    }]), JwtModule.register({
        secret: constants.jwtSecret,
        signOptions: { expiresIn: '60s'}
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy]
})

export class AuthModule {}