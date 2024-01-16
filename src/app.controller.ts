import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class JsonType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  keyName: string;
}

class QueryData {
  @ApiProperty()
  key: string;
}

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('multi')
  getHello() {
    return this.appService.getHello();
  }

  @Post('redis')
  @ApiBody({ description: 'asdf', type: JsonType })
  setJSONtoRedis(@Body() data: JsonType) {
    return this.appService.setJSON(data);
  }

  @Get('redis')
  getJSONfromRedis(@Query() data: QueryData) {
    return this.appService.getJSON(data.key);
  }
}
