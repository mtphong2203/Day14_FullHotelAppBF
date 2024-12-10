import { MasterDto } from "../common/master-dto.model";

export class BookingMasterDto extends MasterDto {
    public bookingDate: Date;
    public checkInDate: Date;
    public checkOutDate: Date;
    public status: string;

    constructor(id: string, active: boolean, insertedAt: Date, updatedAt: Date, deletedAt: Date,
        bookingDate: Date, checkInDate: Date, checkOutDate: Date, status: string) {
        super(id, active, insertedAt, updatedAt, deletedAt);
        this.bookingDate = bookingDate;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.status = status;
    }
}