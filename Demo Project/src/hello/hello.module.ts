import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

// sub module 
@Module({
  imports: [], // import other modules if needed
  controllers: [HelloController],
  providers: [HelloService],
  exports: [] // export service to the other modules if needed 
})
export class HelloModule {}
