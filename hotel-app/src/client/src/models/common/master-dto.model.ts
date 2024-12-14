export class MasterDto {
    public id: string;
    public active: boolean;
    public insertedAt: Date;
    public updatedAt: Date;
    public deletedAt: Date;

    constructor(id: string, active: boolean, insertedAt: Date, updatedAt: Date, deletedAt: Date) {
        this.id = id;
        this.active = active;
        this.insertedAt = insertedAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

}