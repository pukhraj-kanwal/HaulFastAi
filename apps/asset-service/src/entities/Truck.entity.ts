import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Truck, TruckStatus } from "shared-types"; // Import types from shared package

@Entity("trucks") // Specify the table name
export class TruckEntity implements Truck {
    @PrimaryGeneratedColumn("uuid") // Use UUID for primary key
    id!: string;

    @Column({ unique: true }) // Assuming truck IDs are unique
    truckId!: string;

    @Column({ unique: true }) // Assuming VINs are unique
    vin!: string;

    @Column({ type: "date" })
    registrationExpiry!: Date;

    @Column({ type: "date" })
    inspectionExpiry!: Date;

    @Column({
        type: "enum",
        enum: TruckStatus,
        default: TruckStatus.Active,
    })
    status!: TruckStatus;

    // Add other columns as needed based on the full approved list
}