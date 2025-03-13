import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RequestWhithUser } from './jwt.strategy';
import { UserService } from 'src/users/users.service';
import { JwtAuthGuard } from './auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';




export type AuthBody={email:string; password:string}
export type CreateUser={email:string;
                       username:string;
                        password:string}

@ApiTags('users')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService:UserService
    ) {}
     @ApiOkResponse({type:User})
    @Post('login') 
    async login(@Body() authBody: AuthBody) {
        
        return await this.authService.login({
            authBody,
        });
    }

    @ApiOkResponse({type:User})
    @Post('register') 
    async register(@Body() registerBody: CreateUser) {
        
        return await this.authService.register({
            registerBody,
        });
    }

    
    @UseGuards(JwtAuthGuard) 
    @ApiOkResponse({type:User})
    @Get() 
    async authenticateUser(@Req() request: RequestWhithUser) {
        return await this.userService.getUsers();
    }

   
    @UseGuards(JwtAuthGuard) 
    @Put(':id')
    async update(
        @Param('id') userId: string, 
        @Body() updateData: Partial<{ email: string; username: string }>
    ) {
        return this.authService.update(Number(userId), updateData); 
    }
    

    
    @UseGuards(JwtAuthGuard) 
    @ApiOkResponse({type:User})
    @Delete('/:userId') 
    async deleteUser(@Param('userId') userId: string) {
       
        return this.authService.delete(Number(userId)  );
    }
}
