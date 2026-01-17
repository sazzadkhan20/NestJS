import { Controller, Get, Param, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  // Dependency Injection
  constructor(private readonly helloService: HelloService) {}

  @Get('welcome') // http://localhost:3000/hello/welcome
  getHello(): string {
    return this.helloService.getHello();
  }

  @Get('user/:name/:stack') // http://localhost:3000/hello/user/Sazzad/NestJs
  getHelloWithParam1(
    @Param('name') n: string,
    @Param('stack') st: string,
  ): string {
    return this.helloService.getHelloWithName2(n, st);
  }

  @Get('user/:name') // http://localhost:3000/hello/user/Sazzad
  getHelloWithParam2(
    @Param('name') n: string
  ): string {
    return this.helloService.getHelloWithName1(n);
  }

  @Get('user') // http://localhost:3000/hello/user?name=Sazzad Khan&stack=NestJS
  getHelloWithQuery(
    @Query('name') n: string,
    @Query('stack') st: string,
  ): string {
    return this.helloService.getHelloWithName2(n || 'xxx', st || 'PHP');
  }
}
