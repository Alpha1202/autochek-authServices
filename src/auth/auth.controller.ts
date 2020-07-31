import { Controller,Request, Logger, UseGuards, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { MessagePattern, GrpcMethod } from '@nestjs/microservices'

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @GrpcMethod('AuthController', 'login')

    @UseGuards(LocalAuthGuard)
    async login(@Request() req){
        return this.authService.login(req.user)
    }

    // @MessagePattern({ role: 'auth', cmd: 'check'})
    async loggedIn(data) {
        try {
           const res = this.authService.validateToken(data.jwt) 
        } catch (error) {
            Logger.log(error)
            return false
        }
    }
}