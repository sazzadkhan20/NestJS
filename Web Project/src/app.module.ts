import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentModule } from './modules/enrollment.module';

//root Module

@Module({
  imports: [EnrollmentModule, TypeOrmModule.forRoot(
            { type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'sazzad123',
            database: 'MyDBTest',
            autoLoadEntities: true,
            synchronize: true,
            } )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

