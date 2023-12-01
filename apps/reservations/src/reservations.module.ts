import { DatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common/logger';
import { Module } from '@nestjs/common';

import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { ReservationRepistory } from './reservation.repository';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
    imports: [
        DatabaseModule,
        DatabaseModule.forFeature([{ name: ReservationDocument.name, schema: ReservationSchema }]),
        LoggerModule,
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationRepistory],
})
export class ReservationsModule {}
