import { Request, Response, Router } from 'express';
import { TrailerService } from '../services/trailer.service';
import { Trailer } from 'shared-types'; // Import the shared Trailer type

const router = Router();
const trailerService = new TrailerService();

// GET /trailers - Get all trailers
router.get('/', async (req: Request, res: Response) => {
    try {
        const trailers = await trailerService.findAllTrailers();
        res.json(trailers);
    } catch (error) {
        console.error('Error fetching trailers:', error);
        res.status(500).send('Error fetching trailers');
    }
});

// GET /trailers/:id - Get a trailer by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const trailer = await trailerService.findTrailerById(req.params.id);
        if (trailer) {
            res.json(trailer);
        } else {
            res.status(404).send('Trailer not found');
        }
    } catch (error) {
        console.error(`Error fetching trailer with ID ${req.params.id}:`, error);
        res.status(500).send('Error fetching trailer');
    }
});

// POST /trailers - Create a new trailer
router.post('/', async (req: Request, res: Response) => {
    try {
        const trailerData: Partial<Trailer> = req.body;
        const newTrailer = await trailerService.createTrailer(trailerData);
        res.status(201).json(newTrailer);
    } catch (error) {
        console.error('Error creating trailer:', error);
        res.status(500).send('Error creating trailer');
    }
});

// PUT /trailers/:id - Update a trailer by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const trailerData: Partial<Trailer> = req.body;
        const updatedTrailer = await trailerService.updateTrailer(req.params.id, trailerData);
        if (updatedTrailer) {
            res.json(updatedTrailer);
        } else {
            res.status(404).send('Trailer not found');
        }
    } catch (error) {
        console.error(`Error updating trailer with ID ${req.params.id}:`, error);
        res.status(500).send('Error updating trailer');
    }
});

// DELETE /trailers/:id - Delete a trailer by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await trailerService.deleteTrailer(req.params.id);
        if (deleted) {
            res.status(204).send(); // No content on successful deletion
        } else {
            res.status(404).send('Trailer not found');
        }
    } catch (error) {
        console.error(`Error deleting trailer with ID ${req.params.id}:`, error);
        res.status(500).send('Error deleting trailer');
    }
});

export default router; // Export the router