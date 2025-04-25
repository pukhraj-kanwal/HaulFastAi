import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Driver, DriverStatus, DrugTestResult } from "shared-types"; // Import types from shared package

@Entity("drivers") // Specify the table name
export class DriverEntity implements Driver {
    @PrimaryGeneratedColumn("uuid") // Use UUID for primary key
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true }) // Assuming license numbers are unique
    licenseNumber!: string;

    @Column({ type: "date" })
    licenseExpiry!: Date;

    @Column({ type: "date" })
    medicalExpiry!: Date;

    @Column({
        type: "enum",
        enum: DriverStatus,
        default: DriverStatus.Active,
    })
    status!: DriverStatus;

    @Column({
        type: "enum",
        enum: DrugTestResult,
        nullable: true, // Drug test result might not be available initially
    })
    drugTestResult?: DrugTestResult;

    @Column({ type: "date", nullable: true }) // Date of drug test might not be available initially
    drugTestDate?: Date;

    // Add other columns as needed based on the full approved list
}