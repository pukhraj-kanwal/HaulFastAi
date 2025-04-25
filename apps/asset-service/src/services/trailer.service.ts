import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TrailerEntity } from "../entities/Trailer.entity";
import { Trailer } from "shared-types"; // Import the shared Trailer type

export class TrailerService {
    private trailerRepository: Repository<TrailerEntity>;

    constructor() {
        this.trailerRepository = AppDataSource.getRepository(TrailerEntity);
    }

    /**
     * Creates a new trailer.
     * @param trailerData - The data for the new trailer.
     * @returns The created trailer entity.
     */
    async createTrailer(trailerData: Partial<Trailer>): Promise<TrailerEntity> {
        const newTrailer = this.trailerRepository.create(trailerData);
        return this.trailerRepository.save(newTrailer);
    }

    /**
     * Finds all trailers.
     * @returns An array of trailer entities.
     */
    async findAllTrailers(): Promise<TrailerEntity[]> {
        return this.trailerRepository.find();
    }

    /**
     * Finds a trailer by its ID.
     * @param id - The ID of the trailer to find.
     * @returns The trailer entity if found, otherwise undefined.
     */
    async findTrailerById(id: string): Promise<TrailerEntity | undefined> {
        return this.trailerRepository.findOne({ where: { id } });
    }

    /**
     * Updates an existing trailer.
     * @param id - The ID of the trailer to update.
     * @param trailerData - The updated data for the trailer.
     * @returns The updated trailer entity if found and updated, otherwise undefined.
     */
    async updateTrailer(id: string, trailerData: Partial<Trailer>): Promise<TrailerEntity | undefined> {
        const trailer = await this.findTrailerById(id);
        if (!trailer) {
            return undefined;
        }
        this.trailerRepository.merge(trailer, trailerData);
        return this.trailerRepository.save(trailer);
    }

    /**
     * Deletes a trailer by its ID.
     * @param id - The ID of the trailer to delete.
     * @returns True if the trailer was deleted, false otherwise.
     */
    async deleteTrailer(id: string): Promise<boolean> {
        const deleteResult = await this.trailerRepository.delete(id);
        return deleteResult.affected !== 0;
    }
}