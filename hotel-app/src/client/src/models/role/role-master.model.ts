import { MasterDto } from "../common/master-dto.model";

export class RoleMasterDto extends MasterDto {
    public name: string;
    public description: string;

    constructor(id: string, active: boolean, insertedAt: Date, updatedAt: Date, deletedAt: Date, name: string, description: string) {
        super(id, active, insertedAt, updatedAt, deletedAt);
        this.name = name;
        this.description = description;
    }
}