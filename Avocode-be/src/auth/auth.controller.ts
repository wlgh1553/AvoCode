import { AuthService } from '@auth/auth.service';
import { LoginDto } from '@auth/dto/login.dto';
import { LocalAuthGuard } from '@auth/local-auth.guard';
import { Public } from '@common/annotation/public.annotation';
import { ResponseDto } from '@common/response/response.format';
import { Body, Controller, Get, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
        return new ResponseDto(await this.authService.login(loginDto));
    }

    @Get('profile')
    getProfile(@Request() req): Promise<any> {
        return req.user;
    }
}
