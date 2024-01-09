import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class JsonType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
}

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('redis')
  @ApiBody({ description: 'asdf', type: JsonType })
  setJSONtoRedis(@Body() data: JsonType) {
    return this.appService.setJSON(data);
  }

  @Get('redis')
  getJSONfromRedis() {
    return this.appService.getJSON();
  }
}
