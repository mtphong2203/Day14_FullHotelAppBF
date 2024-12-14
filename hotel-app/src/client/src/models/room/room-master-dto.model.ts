import { MasterDto } from "../common/master-dto.model";

export class RoomMasterDto extends MasterDto {
    public number: string;
    public type: string;
    public price: number;
    public capacity: number;

    constructor(id: string, active: boolean, insertedAt: Date, updatedAt: Date, deletedAt: Date, number: string, type: string, price: number, capacity: number) {
        super(id, active, insertedAt, updatedAt, deletedAt);
        this.number = number;
        this.type = type;
        this.price = price;
        this.capacity = capacity;
    }
}
