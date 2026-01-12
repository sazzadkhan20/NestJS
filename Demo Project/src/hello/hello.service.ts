import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hello NestJS';
  }

  getHelloWithName(name: string, stack: string): string {
    return `Welcome ${name} to New Stack ${stack}`;
  }
}
