import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TruckEntity } from "../entities/Truck.entity";
import { Truck } from "shared-types"; // Import the shared Truck type

export class TruckService {
    private truckRepository: Repository<TruckEntity>;

    constructor() {
        this.truckRepository = AppDataSource.getRepository(TruckEntity);
    }

    /**
     * Creates a new truck.
     * @param truckData - The data for the new truck.
     * @returns The created truck entity.
     */
    async createTruck(truckData: Partial<Truck>): Promise<TruckEntity> {
        const newTruck = this.truckRepository.create(truckData);
        return this.truckRepository.save(newTruck);
    }

    /**
     * Finds all trucks.
     * @returns An array of truck entities.
     */
    async findAllTrucks(): Promise<TruckEntity[]> {
        return this.truckRepository.find();
    }

    /**
     * Finds a truck by its ID.
     * @param id - The ID of the truck to find.
     * @returns The truck entity if found, otherwise undefined.
     */
    async findTruckById(id: string): Promise<TruckEntity | undefined> {
        return this.truckRepository.findOne({ where: { id } });
    }

    /**
     * Updates an existing truck.
     * @param id - The ID of the truck to update.
     * @param truckData - The updated data for the truck.
     * @returns The updated truck entity if found and updated, otherwise undefined.
     */
    async updateTruck(id: string, truckData: Partial<Truck>): Promise<TruckEntity | undefined> {
        const truck = await this.findTruckById(id);
        if (!truck) {
            return undefined;
        }
        this.truckRepository.merge(truck, truckData);
        return this.truckRepository.save(truck);
    }

    /**
     * Deletes a truck by its ID.
     * @param id - The ID of the truck to delete.
     * @returns True if the truck was deleted, false otherwise.
     */
    async deleteTruck(id: string): Promise<boolean> {
        const deleteResult = await this.truckRepository.delete(id);
        return deleteResult.affected !== 0;
    }
}