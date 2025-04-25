import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { DriverEntity } from "../entities/Driver.entity";
import { Driver } from "shared-types"; // Import the shared Driver type

export class DriverService {
    private driverRepository: Repository<DriverEntity>;

    constructor() {
        this.driverRepository = AppDataSource.getRepository(DriverEntity);
    }

    /**
     * Creates a new driver.
     * @param driverData - The data for the new driver.
     * @returns The created driver entity.
     */
    async createDriver(driverData: Partial<Driver>): Promise<DriverEntity> {
        const newDriver = this.driverRepository.create(driverData);
        return this.driverRepository.save(newDriver);
    }

    /**
     * Finds all drivers.
     * @returns An array of driver entities.
     */
    async findAllDrivers(): Promise<DriverEntity[]> {
        return this.driverRepository.find();
    }

    /**
     * Finds a driver by their ID.
     * @param id - The ID of the driver to find.
     * @returns The driver entity if found, otherwise undefined.
     */
    async findDriverById(id: string): Promise<DriverEntity | undefined> {
        return this.driverRepository.findOne({ where: { id } });
    }

    /**
     * Updates an existing driver.
     * @param id - The ID of the driver to update.
     * @param driverData - The updated data for the driver.
     * @returns The updated driver entity if found and updated, otherwise undefined.
     */
    async updateDriver(id: string, driverData: Partial<Driver>): Promise<DriverEntity | undefined> {
        const driver = await this.findDriverById(id);
        if (!driver) {
            return undefined;
        }
        this.driverRepository.merge(driver, driverData);
        return this.driverRepository.save(driver);
    }

    /**
     * Deletes a driver by their ID.
     * @param id - The ID of the driver to delete.
     * @returns True if the driver was deleted, false otherwise.
     */
    async deleteDriver(id: string): Promise<boolean> {
        const deleteResult = await this.driverRepository.delete(id);
        return deleteResult.affected !== 0;
    }
}