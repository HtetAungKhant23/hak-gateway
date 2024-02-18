import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import axios from 'axios';
import { Responser } from './libs/exception/Responser';

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

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ? to reload all microservices cause of using render's deployment architecture of free plan (free instance will spin down with inactivity, which can delay requests by 50 seconds or more)
  @Get('reload-microservices')
  async reload() {
    return await axios
      .get('https://product-service-onjp.onrender.com/reload')
      .then(() => {
        return Responser({
          statusCode: 200,
          messageEn: 'services reload success',
          data: null,
        });
      })
      .catch(() => {
        return Responser({
          statusCode: 200,
          messageEn: 'something wrong',
          data: null,
        });
      });
  }

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
