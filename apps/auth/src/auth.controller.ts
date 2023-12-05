import { Controller, Post, Res, UseGuards } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices/decorators';
import { LocalAuthGuard } from 'apps/reservations/src/guards/local-auth.guard';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDocument } from './users/models/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@CurrentUser() user: UserDocument, @Res({ passthrough: true }) response: Response) {
        const jwt = await this.authService.login(user, response);
        response.send(jwt);
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('authenticate')
    async authenticate(@Payload() data: any) {
        return data.user;
    }
}
