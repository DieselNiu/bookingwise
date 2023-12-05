import { DatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common/logger';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationRepistory } from './reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema }]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                PORT: Joi.number().required(),
            }),
        }),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationRepistory],
})
export class ReservationsModule {}
