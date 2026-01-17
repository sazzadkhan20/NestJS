import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelloService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello NestJS';
  }

  getHelloWithName1(name: string): string {
    const appName = this.configService.get<string>('appName');
    console.log(appName);
    return `Welcome ${name} to New Stack ${appName}`;
  }

  getHelloWithName2(name: string, stack: string): string {
    return `Welcome ${name} to New Stack ${stack}`;
  }

  getWelcomeWithName(name: string): string {
    return `Welcome ${name}`;
  }
}
