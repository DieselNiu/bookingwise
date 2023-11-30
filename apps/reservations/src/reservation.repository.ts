import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { ReservationDocument } from './models/reservation.schema';

@Injectable()
export class ReservationRepistory extends AbstractRepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationRepistory.name);

    constructor(
        @InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>,
    ) {
        super(reservationModel);
    }
}
