import { MasterDto } from "../common/master-dto.model";

export class OrderMasterDto extends MasterDto {
    public name: string;
    public price: number;

    constructor(id: string, active: boolean, insertedAt: Date, updatedAt: Date, deletedAt: Date, name: string, price: number) {
        super(id, active, insertedAt, updatedAt, deletedAt);
        this.name = name;
        this.price = price;
    }
}
