import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { ApiCodeResponse, ApiResponse } from '@common/config';

/**
 * Contrôleur principal de l'application
 * Gère les endpoints de base
 */
@Controller('start')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Endpoint GET pour tester l'API
   * @returns ApiResponse avec un message de bienvenue
   */
  @ApiOperation({ summary: 'Hello World endpoint' })
  @Get('hello')
  getHello(): ApiResponse {
    return { 
      result: true, 
      code: ApiCodeResponse.TEST, 
      data: this.appService.getHello() 
    };
  }

  /**
   * Endpoint POST alternatif pour tester l'API
   * @returns ApiResponse avec un message de bienvenue
   */
  @ApiOperation({ summary: 'Hello World 2 endpoint' })
  @Post('hello2')
  getHello2(): ApiResponse {
    return { 
      result: true, 
      code: ApiCodeResponse.TEST, 
      data: this.appService.getHello() 
    };
  }
}
