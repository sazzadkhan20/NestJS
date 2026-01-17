import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

// sub module 
@Module({
  imports: [], // import other modules if needed
  controllers: [HelloController],
  providers: [HelloService],
  exports: [HelloService] // export service to the other modules if needed 
})
export class HelloModule {}
function ConfigModule(arg0: {}): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
  throw new Error('Function not implemented.');
}

