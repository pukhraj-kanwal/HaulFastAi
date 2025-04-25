import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Trailer, TrailerStatus } from "shared-types"; // Import types from shared package

@Entity("trailers") // Specify the table name
export class TrailerEntity implements Trailer {
    @PrimaryGeneratedColumn("uuid") // Use UUID for primary key
    id!: string;

    @Column({ unique: true }) // Assuming trailer IDs are unique
    trailerId!: string;

    @Column({ type: "date" })
    registrationExpiry!: Date;

    @Column({ type: "date" })
    inspectionExpiry!: Date;

    @Column({
        type: "enum",
        enum: TrailerStatus,
        default: TrailerStatus.Active,
    })
    status!: TrailerStatus;

    // Add other columns as needed based on the full approved list
}