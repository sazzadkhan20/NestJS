import { Module } from '@nestjs/common'
import { EnrollmentController } from '../controllers/enrollment.controller'
import { EnrollmentService } from '../services/enrollment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserCategoryOneEntity } from 'src/entities/UserCategoryOne.entity'
import { UserCategoryTwoEntity } from 'src/entities/UserCategoryTwo.entity'
import { UserCategoryThreeEntity } from 'src/entities/UserCategorythree.entity'

@Module(
{
    imports : [TypeOrmModule.forFeature([UserCategoryOneEntity,UserCategoryTwoEntity,UserCategoryThreeEntity]),],
    controllers : [EnrollmentController],
    providers : [EnrollmentService],
})
export class EnrollmentModule{}